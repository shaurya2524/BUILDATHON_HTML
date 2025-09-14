"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Policy {
  id: string;
  name: string;
  policyNumber: string;
  type: string;
}

interface UploadedFile {
  name: string;
  size: string;
  url?: string; // Optional URL property
}

// Policy list
const policiesData: Policy[] = [
  { id: "1", name: "Rajesh Kumar", policyNumber: "LIC-789456123", type: "Life Insurance" },
  { id: "2", name: "Priya Sharma", policyNumber: "HDFC-456789012", type: "Health Insurance" },
  { id: "3", name: "Amit Patel", policyNumber: "ICICI-123456789", type: "Motor Insurance" },
];

// Claim status sample data
const claimStatusData = {
  status: "Under Review",
  progress: 50,
  uploadedDocuments: [
    { name: "death_certificate.pdf", size: "1.2MB" },
    { name: "medical_reports.pdf", size: "2.5MB" },
    { name: "policy_document.pdf", size: "800KB" },
  ],
  claimant: "Rajesh Kumar",
  policyNumber: "LIC-789456123",
  claimAmount: "₹5,00,000",
  trackingSteps: ["Document Submission", "Verification", "Approval", "Claim Settled"],
};

// Required documents
const requiredDocuments = [
  "FIR Copy",
  "Driving License",
  "RC Copy",
  "Repair Estimates",
  "Photos of Damage",
  "Policy Document",
];

const App = () => {
  const [activeTab, setActiveTab] = useState<"initiate" | "track">("initiate");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  // Map: policyId -> document name -> array of uploaded files
  const [claimsMap, setClaimsMap] = useState<Record<string, Record<string, UploadedFile[]>>>({});

  // When selecting a policy, initialize its claim documents map if not already
  const handlePolicySelect = (policy: Policy) => {
    setSelectedPolicy(policy);
    if (!claimsMap[policy.id]) {
      const initDocs: Record<string, UploadedFile[]> = {};
      requiredDocuments.forEach((doc) => {
        initDocs[doc] = [];
      });
      setClaimsMap((prev) => ({ ...prev, [policy.id]: initDocs }));
    }
  };

  // Handle uploading files for a specific document of the selected policy
  const handleFilesUpload = (doc: string, files: FileList | File[]) => {
    if (!selectedPolicy) return;
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
    }));

    setClaimsMap((prev) => {
      const policyDocs = { ...prev[selectedPolicy.id] };
      policyDocs[doc] = policyDocs[doc] ? [...policyDocs[doc], ...newFiles] : newFiles;
      return { ...prev, [selectedPolicy.id]: policyDocs };
    });
  };

  // Remove a file from a document of the selected policy
  
  
  const handleRemoveFile = (doc: string, index: number) => {
    if (!selectedPolicy) return;
  
    setClaimsMap((prev) => {
      // Get existing documents for this policy
      const policyDocs = prev[selectedPolicy.id] ? { ...prev[selectedPolicy.id] } : {};
  
      // If the doc array exists, filter out the file at the given index
      if (policyDocs[doc]) {
        policyDocs[doc] = policyDocs[doc].filter((_, i) => i !== index);
      }
  
      return { ...prev, [selectedPolicy.id]: policyDocs };
    });
  };

  // Render Initiate Claim tab
  const renderInitiateClaim = () => {
    const uploadedFiles = selectedPolicy ? claimsMap[selectedPolicy.id] : {};
    const uploadedCount = uploadedFiles
      ? Object.values(uploadedFiles).reduce((sum, arr) => sum + arr.length, 0)
      : 0;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policy selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Select Policy</h2>
          </div>
          <div className="space-y-4">
            {policiesData.map((policy) => (
              <div
                key={policy.id}
                onClick={() => handlePolicySelect(policy)}
                className={`p-4 rounded-md border cursor-pointer transition-colors ${
                  selectedPolicy?.id === policy.id
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{policy.name}</h3>
                    <p className="text-sm text-gray-600">{policy.policyNumber}</p>
                  </div>
                  {selectedPolicy?.id === policy.id && <span className="text-emerald-500 font-bold">✓</span>}
                </div>
                <span className="mt-2 inline-block px-2 py-1 text-xs font-medium text-emerald-800 bg-emerald-200 rounded-full">{policy.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required documents and upload */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-black">Required Documents</h2>
            <span className="text-sm font-medium text-black">
              {uploadedCount}/{requiredDocuments.length}
            </span>
          </div>

          <div className="space-y-4">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex flex-col p-4 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                <span className="text-black">{doc}</span>

                <div
                  className="mt-2 flex flex-col gap-2 p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-emerald-500 hover:bg-gray-50"
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => handleFilesUpload(doc, e.dataTransfer.files)}

                  onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                >
                  {uploadedFiles && uploadedFiles[doc] && uploadedFiles[doc].length > 0 ? (
                    uploadedFiles[doc].map((file, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded-md">
                        <span className="text-sm text-gray-700">{file.name} ({file.size})</span>
                        <button
                          className="text-red-500 hover:text-red-700 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(doc, idx);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Click or drag & drop files here</span>
                  )}
                </div>

                <input
                  type="file"
                  id={`file-input-${index}`}
                  className="hidden"
                  onChange={(e) => handleFilesUpload(doc, e.target.files!)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Render Track Claims tab (same design as your reference)
  const renderTrackClaims = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-xl shadow-lg p-6">
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search claims by policy number or customer name..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        />
      </div>

      {/* Claim Status Card */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{claimStatusData.claimant}</h3>
            <p className="text-sm text-gray-600">{claimStatusData.policyNumber}</p>
          </div>
          <div className="text-right">
            <span className="block text-lg font-semibold text-emerald-600">{claimStatusData.claimAmount}</span>
            <span className="flex items-center justify-end space-x-1 text-sm text-yellow-600">{claimStatusData.status}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${claimStatusData.progress}%` }}></div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Uploaded Documents</h4>
          <div className="flex flex-wrap gap-2">
            {claimStatusData.uploadedDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center text-black space-x-1 px-3 py-2 bg-white rounded-md border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // Open the PDF in a new tab
                  const fileUrl = `/uploads/${doc.name}`;
                  window.open(fileUrl, "_blank");
                }}
                title="Click to open PDF"
              >
                <span>{doc.name}</span>
              </div>
            ))}
          </div>

        </div>


        {/* Claim Status Steps */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Claim Status</h4>
          <div className="flex justify-between items-center text-center">
            {claimStatusData.trackingSteps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${index <= 1 ? "bg-emerald-500" : "bg-gray-300"}`}></div>
                <p className={`mt-2 text-xs font-medium ${index <= 1 ? "text-gray-800" : "text-gray-500"}`}>{step}</p>
                {index < claimStatusData.trackingSteps.length - 1 && (
                  <div className={`w-full h-1 my-1 ${index < 1 ? "bg-emerald-500" : "bg-gray-300"}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Claim Support</h1>
            <p className="text-gray-600">Initiate new claims and track existing claim status</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center mb-6 space-x-2">
          <button
            onClick={() => setActiveTab("initiate")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "initiate" ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Initiate Claim
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "track" ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Track Claims
          </button>
        </div>

        {/* Content */}
        {activeTab === "initiate" ? renderInitiateClaim() : renderTrackClaims()}
      </div>
    </div>
  );
};

export default App;
