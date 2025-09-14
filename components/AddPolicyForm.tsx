"use client";

import React, { useState } from "react";
import { CheckCircle, File, X } from "lucide-react";
import axios, { AxiosError } from "axios";



const API_BASE_URL = "https://buildathon-team-5.vercel.app";
const Backend_BASE_URL = "https://buildathon-5n46.vercel.app";
const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
interface ExtractedData {
  fullName: string;
  dateOfBirth: string;
  alternateContact: string;
  gender: string;
  address: string;
  contactNumbers: string;
  mailId: string;
  insuranceCompany: string;
  policyNumber: string;
  policyType: string;
  policyPlanProductName: string;
  policyStartDate: string;
  policyEndDate: string;
  premiumAmount: string;
  premiumDueDate: string;
  nomineeName: string;
  nomineeContact: string;
  relationshipToPolicyholder: string;
}

// Example type (you can extend this)




const AddPolicyForm = () => {
  const [formData, setFormData] = useState<ExtractedData>({} as ExtractedData);
  const [loadingExtract,] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);


  const handleExtract = async () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("files", uploadedFiles[0]);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/extract`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Raw Extracted Data:", response.data);
  
      // Clear old formData
      setFormData({} as ExtractedData);
  
      // Normalize each doc via AI
      const docs = Object.values(response.data);
  
      const normalizedDocs = [];
      for (const doc of docs) {
        const cleaned = await normalize(doc);
        if (cleaned) normalizedDocs.push(cleaned);
      }
  
      console.log("All Normalized Docs:", normalizedDocs);
  
      // If you want only the first one in form
      if (normalizedDocs.length > 0) setFormData(normalizedDocs[0]);
  
    } catch (error) {
      console.error("Error extracting data:", error);
    }
  };
  
  

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      setUploadedFiles(Array.from(files));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
  };

  const normalize = async (rawData: unknown) => {
    if (!GEMINI_API_URL || !GEMINI_API_KEY) {
      throw new Error("❌ Missing Gemini API config");
    }
  
    try {
      const prompt = `
  You are a data cleaner. Convert the following extracted insurance policy data into strict JSON matching this schema:
  
  {
    "fullName": "",
    "dateOfBirth": "",
    "gender": "",
    "contactNumbers": "",
    "alternateContact": "",
    "mailId": "",
    "address": "",
    "insuranceCompany": "",
    "policyNumber": "",
    "policyType": "",
    "policyPlanProductName": "",
    "policyStartDate": "",
    "policyEndDate": "",
    "premiumAmount": "",
    "premiumDueDate": "",
    "nomineeName": "",
    "nomineeContact": "",
    "relationshipToPolicyholder": ""
  }
  
  Here is the extracted data:
  ${JSON.stringify(rawData, null, 2)}
  `;
  
      const response = await axios.post(
        `${GEMINI_API_URL}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json", "X-goog-api-key": GEMINI_API_KEY } }
      );
  
      let aiText = response.data.candidates[0].content.parts[0].text;
  
      // Remove possible code block formatting ```json ... ```
      aiText = aiText.replace(/```json/i, "").replace(/```/g, "").trim();
  
      const cleaned = JSON.parse(aiText);
      const finalCleaned = postProcessContacts(cleaned)
  
      console.log("✅ Normalized JSON:", finalCleaned);
      return finalCleaned;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error("Gemini normalization error:", err.response?.data || err.message);
      } else {
        console.error("Gemini normalization error:", err);
      }
      return null;
    }
  };
  const postProcessContacts = (data: ExtractedData) => {
    if (data.contactNumbers && data.contactNumbers.includes(",")) {
      const numbers = data.contactNumbers.split(",").map((n: string) => n.trim());
      data.contactNumbers = numbers[0] || "";
      data.alternateContact = numbers[1] || "";
    }
    return data;
  }

  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      // Map frontend data to backend schema
      const payload = {
        name: formData.fullName || "",
        contact: formData.contactNumbers || "",
        alternateContact: formData.alternateContact || "",
        mailId: formData.mailId || "",
        birthDate: formData.dateOfBirth || "",
        gender: formData.gender || "",
        address: formData.address,
        policy: [
          {
            policyNumber: formData.policyNumber || "",
            insuranceCompany: formData.insuranceCompany || "",
            policyType: formData.policyType || "Term Life", // default if empty
            premium: formData.premiumAmount ? Number(formData.premiumAmount) : 0,
            policyName: formData.policyPlanProductName || "",
            startDate: formData.policyStartDate || "",
            renewalDate: formData.policyEndDate || "",
            nomineeName: formData.nomineeName || "",
            relation: formData.relationshipToPolicyholder || "",
            nomineeContact: formData.nomineeContact || "",
            claim: false,
            status: "Submission",
          }
        ]
      };
  
      console.log("Payload to send:", payload); // Check the payload in console
  
      const res = await axios.post(`${Backend_BASE_URL}/add-customer`, payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      alert(res.data.message || "Policy added successfully!");
      setFormData({} as ExtractedData);
      setUploadedFiles([]);
    } catch (err: unknown) {
  if (err instanceof AxiosError) {
    console.error("Gemini normalization error:", err.response?.data || err.message);
  } else {
    console.error("Gemini normalization error:", err);
  }
  return null;
}
  };
  
  
  
  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
      {/* Left: Upload + Autofill */}
      <div className="w-full lg:w-1/3 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center">
        <h3 className="text-xl text-black font-semibold mb-4 text-center">
          Media Upload
        </h3>
        <p className="text-sm text-black mb-4 text-center">
          Add your documents here, and you can upload up to 5 files...
        </p>

        {/* Drag & Drop Upload */}
        <div
          className="w-full border-2 border-dashed border-teal-400 rounded-xl p-8 text-center mb-4 transition-colors duration-300 hover:border-teal-600"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <svg
            className="mx-auto h-12 w-12 text-teal-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <input
            type="file"
            multiple
            accept=".jpg,.png,.svg,.zip,.pdf"
            className="hidden"
            id="fileUpload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer text-black text-sm mt-3 inline-block"
          >
            Drag your file(s) or{" "}
            <span className="text-teal-500 font-semibold">browse</span>
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Max 10 MB per file, up to 5 files allowed
          </p>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Only support .jpg, .png and .svg .pdf and zip files
        </p>

        {/* Visual effect for uploaded files */}
        {uploadedFiles.length > 0 && (
          <div className="w-full mt-4 p-4 bg-teal-50 rounded-lg">
            <div className="flex items-center text-teal-700">
              <CheckCircle size={20} className="mr-2" />
              <p className="font-medium text-sm">
                {uploadedFiles.length} file(s) uploaded successfully!
              </p>
            </div>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
                >
                  <span className="flex items-center truncate">
                    <File size={16} className="mr-2 text-gray-400" />
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.name)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Autofill Checkbox */}
        <div className="flex items-center space-x-2 w-full mt-4">
        <button
                type="button"
                onClick={handleExtract}
                disabled={loadingExtract}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-400"
              >
                {loadingExtract ? "Extracting..." : "Extract Data"}
              </button>

          {/* <input
            type="checkbox"
            id="autofill"
            checked={autofill}
            onChange={() => {
              setAutofill(!autofill)
            }}
            className="h-4 w-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
          /> */}
          {/* <label htmlFor="autofill" className="text-sm text-gray-700">
            Autofill from document
          </label> */}
        </div>
      </div>

      {/* Right: Scrollable Form */}
      <div className="w-full lg:w-2/3 max-h-[600px] overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Customer Onboarding form details
        </h2>

        {/* Form with API call */}
        <form onSubmit={handleAddPolicy} className="space-y-6">
          {/* Customer Info */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-700 text-lg mb-4">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name*"
                value={formData.fullName || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
                  }
                  className="border border-gray-300 text-black px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Gender*"
                  value={formData.gender || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="border text-black border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Alternate Contact*"
                  value={formData.alternateContact || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, alternateContact: e.target.value }))
                  }

                  className="border text-black border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-700 text-lg mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Mobile Number*"
                value={formData.contactNumbers || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, contactNumbers: e.target.value }))
                  }
                className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Alternate Mobile Number"
          
                className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <input
              type="email"
              placeholder="E-mail Address"
              value={formData.mailId || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, mailId: e.target.value }))
                  }
              className="border text-black border-gray-300 px-3 py-2 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Policy Info */}
          <div className="p-4 border text-black border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-black text-gray-700 text-lg mb-4">
              Policy Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Policy Number*"
                value={formData.policyNumber || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, policyNumber: e.target.value }))
                  }
                className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Insurance Company*"
                value={formData.insuranceCompany || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, insuranceCompany: e.target.value }))
                  }
                className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={formData.policyType || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, policyType: e.target.value }))
                }
                className="border border-gray-300 rounded p-2"
              >
                <option value="">Policy Type*</option>
                <option value="Term Life">Term Life</option>
                <option value="Health">Health</option>
                <option value="Motor">Motor</option>
                <option value="Travel">Travel</option>
              </select>

              <input
                type="text"
                placeholder="Policy Plan / Product Name*"
                value={formData.policyPlanProductName || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, policyPlanProductName: e.target.value }))
                  }
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="date"
                placeholder="Policy Start Date*"
                value={formData.policyStartDate || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, policyStartDate: e.target.value }))
                  }
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Policy Term*"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, policyTerm: e.target.value }))
                }
                className="border border-gray-300 rounded p-2"
              />

            </div>
          </div>

          {/* Nominee Info */}
          <div className="p-4 border text-black border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-700 text-lg mb-4">
              Nominee Information
            </h3>
            <input
              type="text"
              placeholder="Nominee Name*"
              value={formData.nomineeName || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nomineeName: e.target.value }))
                  }
              className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Relationship to Policy Holder*"
                value={formData.relationshipToPolicyholder || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, relationshipToPolicyholder: e.target.value }))
                  }
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Nominee Contact"
                value={formData.nomineeContact || ""}
                  onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nomineeContact: e.target.value }))
                  }
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Add Policy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPolicyForm;
