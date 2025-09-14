"use client";

import React, { useState } from "react";
import { ChevronRight, Filter, ArrowLeft, Info } from "lucide-react";
import Image from "next/image";

// Define a type for the policy data
interface Policy {
  category: string;
  company: string;
  policyNumber: string;
  lifeCover: string;
  coverTillAge: string;
  claimSettled: string;
  annualCommission: string;
  icon: string;
}

// Dummy data for policies with a category field
const policiesData: Policy[] = [
  {
    category: "Life Insurance",
    company: "HDFC",
    policyNumber: "13452",
    lifeCover: "Rs 50 Lac",
    coverTillAge: "60yrs",
    claimSettled: "99.7%",
    annualCommission: "30%",
    icon: "https://placehold.co/40x40/1f4d9c/ffffff?text=HDFC",
  },
  {
    category: "Life Insurance",
    company: "SBI",
    policyNumber: "98765",
    lifeCover: "Rs 75 Lac",
    coverTillAge: "65yrs",
    claimSettled: "98.5%",
    annualCommission: "25%",
    icon: "https://placehold.co/40x40/004085/ffffff?text=SBI",
  },
  {
    category: "Life Insurance",
    company: "LIC",
    policyNumber: "54321",
    lifeCover: "Rs 1 Cr",
    coverTillAge: "70yrs",
    claimSettled: "99.9%",
    annualCommission: "35%",
    icon: "https://placehold.co/40x40/85144b/ffffff?text=LIC",
  },
  {
    category: "Life Insurance",
    company: "Max Life",
    policyNumber: "44556",
    lifeCover: "Rs 60 Lac",
    coverTillAge: "60yrs",
    claimSettled: "98.1%",
    annualCommission: "28%",
    icon: "https://placehold.co/40x40/d63384/ffffff?text=MLI",
  },
  {
    category: "Life Insurance",
    company: "Kotak",
    policyNumber: "99001",
    lifeCover: "Rs 90 Lac",
    coverTillAge: "70yrs",
    claimSettled: "98.8%",
    annualCommission: "29%",
    icon: "https://placehold.co/40x40/000000/ffffff?text=KOTAK",
  },
  {
    category: "Life Insurance",
    company: "Tata AIA",
    policyNumber: "22334",
    lifeCover: "Rs 1.2 Cr",
    coverTillAge: "75yrs",
    claimSettled: "99.6%",
    annualCommission: "38%",
    icon: "https://placehold.co/40x40/a62c11/ffffff?text=TATA",
  },
  {
    category: "Life Insurance",
    company: "PNB",
    policyNumber: "55667",
    lifeCover: "Rs 30 Lac",
    coverTillAge: "60yrs",
    claimSettled: "96.5%",
    annualCommission: "18%",
    icon: "https://placehold.co/40x40/800000/ffffff?text=PNB",
  },
  {
    category: "Life Insurance",
    company: "Aditya Birla",
    policyNumber: "88990",
    lifeCover: "Rs 70 Lac",
    coverTillAge: "65yrs",
    claimSettled: "97.8%",
    annualCommission: "26%",
    icon: "https://placehold.co/40x40/ffc107/000000?text=ABG",
  },
  {
    category: "Life Insurance",
    company: "Reliance",
    policyNumber: "65432",
    lifeCover: "Rs 85 Lac",
    coverTillAge: "70yrs",
    claimSettled: "98.9%",
    annualCommission: "31%",
    icon: "https://placehold.co/40x40/f44336/ffffff?text=REL",
  },
  {
    category: "Life Insurance",
    company: "Aegon",
    policyNumber: "91827",
    lifeCover: "Rs 55 Lac",
    coverTillAge: "62yrs",
    claimSettled: "96.1%",
    annualCommission: "22%",
    icon: "https://placehold.co/40x40/00bcd4/ffffff?text=AEG",
  },
  {
    category: "Health Insurance",
    company: "Bajaj",
    policyNumber: "11223",
    lifeCover: "Rs 40 Lac",
    coverTillAge: "55yrs",
    claimSettled: "97.0%",
    annualCommission: "20%",
    icon: "https://placehold.co/40x40/a62c11/ffffff?text=BJL",
  },
  {
    category: "Health Insurance",
    company: "Max Life",
    policyNumber: "44556",
    lifeCover: "Rs 60 Lac",
    coverTillAge: "60yrs",
    claimSettled: "98.1%",
    annualCommission: "28%",
    icon: "https://placehold.co/40x40/d63384/ffffff?text=MLI",
  },
  {
    category: "Health Insurance",
    company: "ICICI",
    policyNumber: "77889",
    lifeCover: "Rs 80 Lac",
    coverTillAge: "65yrs",
    claimSettled: "99.2%",
    annualCommission: "32%",
    icon: "https://placehold.co/40x40/4e5d94/ffffff?text=ICICI",
  },
  {
    category: "Health Insurance",
    company: "Star Health",
    policyNumber: "10112",
    lifeCover: "Rs 15 Lac",
    coverTillAge: "70yrs",
    claimSettled: "98.5%",
    annualCommission: "25%",
    icon: "https://placehold.co/40x40/4caf50/ffffff?text=STR",
  },
  {
    category: "Health Insurance",
    company: "Apollo Munich",
    policyNumber: "23456",
    lifeCover: "Rs 20 Lac",
    coverTillAge: "65yrs",
    claimSettled: "97.9%",
    annualCommission: "28%",
    icon: "https://placehold.co/40x40/03a9f4/ffffff?text=APL",
  },
  {
    category: "Health Insurance",
    company: "HDFC ERGO",
    policyNumber: "78901",
    lifeCover: "Rs 25 Lac",
    coverTillAge: "75yrs",
    claimSettled: "99.1%",
    annualCommission: "30%",
    icon: "https://placehold.co/40x40/ff9800/ffffff?text=HFC",
  },
  {
    category: "Health Insurance",
    company: "Cigna",
    policyNumber: "34567",
    lifeCover: "Rs 10 Lac",
    coverTillAge: "60yrs",
    claimSettled: "96.8%",
    annualCommission: "22%",
    icon: "https://placehold.co/40x40/9c27b0/ffffff?text=CIG",
  },
  {
    category: "Health Insurance",
    company: "New India",
    policyNumber: "89012",
    lifeCover: "Rs 30 Lac",
    coverTillAge: "80yrs",
    claimSettled: "99.5%",
    annualCommission: "35%",
    icon: "https://placehold.co/40x40/e91e63/ffffff?text=NIA",
  },
  {
    category: "Health Insurance",
    company: "Royal Sundaram",
    policyNumber: "45678",
    lifeCover: "Rs 45 Lac",
    coverTillAge: "65yrs",
    claimSettled: "98.3%",
    annualCommission: "26%",
    icon: "https://placehold.co/40x40/ffeb3b/000000?text=RYS",
  },
  {
    category: "Health Insurance",
    company: "Aditya Birla Health",
    policyNumber: "90123",
    lifeCover: "Rs 50 Lac",
    coverTillAge: "70yrs",
    claimSettled: "97.6%",
    annualCommission: "29%",
    icon: "https://placehold.co/40x40/795548/ffffff?text=ABH",
  },
  {
    category: "Home Insurance",
    company: "Kotak",
    policyNumber: "99001",
    lifeCover: "Rs 90 Lac",
    coverTillAge: "70yrs",
    claimSettled: "98.8%",
    annualCommission: "29%",
    icon: "https://placehold.co/40x40/000000/ffffff?text=KOTAK",
  },
  {
    category: "Home Insurance",
    company: "Tata AIA",
    policyNumber: "22334",
    lifeCover: "Rs 1.2 Cr",
    coverTillAge: "75yrs",
    claimSettled: "99.6%",
    annualCommission: "38%",
    icon: "https://placehold.co/40x40/a62c11/ffffff?text=TATA",
  },
  {
    category: "Home Insurance",
    company: "HDFC ERGO",
    policyNumber: "11223",
    lifeCover: "Rs 2 Cr",
    coverTillAge: "80yrs",
    claimSettled: "99.1%",
    annualCommission: "30%",
    icon: "https://placehold.co/40x40/ff9800/ffffff?text=HFC",
  },
  {
    category: "Home Insurance",
    company: "Bharti AXA",
    policyNumber: "34567",
    lifeCover: "Rs 1.5 Cr",
    coverTillAge: "70yrs",
    claimSettled: "98.5%",
    annualCommission: "27%",
    icon: "https://placehold.co/40x40/673ab7/ffffff?text=BHA",
  },
  {
    category: "Home Insurance",
    company: "Chola",
    policyNumber: "89012",
    lifeCover: "Rs 1 Cr",
    coverTillAge: "65yrs",
    claimSettled: "97.8%",
    annualCommission: "24%",
    icon: "https://placehold.co/40x40/3f51b5/ffffff?text=CHL",
  },
  {
    category: "Home Insurance",
    company: "Go Digit",
    policyNumber: "45678",
    lifeCover: "Rs 2.5 Cr",
    coverTillAge: "85yrs",
    claimSettled: "99.9%",
    annualCommission: "40%",
    icon: "https://placehold.co/40x40/009688/ffffff?text=GDG",
  },
  {
    category: "Home Insurance",
    company: "Bajaj Allianz",
    policyNumber: "90123",
    lifeCover: "Rs 1.8 Cr",
    coverTillAge: "78yrs",
    claimSettled: "98.2%",
    annualCommission: "29%",
    icon: "https://placehold.co/40x40/e91e63/ffffff?text=BJA",
  },
  {
    category: "Home Insurance",
    company: "SBI General",
    policyNumber: "56789",
    lifeCover: "Rs 1.3 Cr",
    coverTillAge: "68yrs",
    claimSettled: "97.5%",
    annualCommission: "26%",
    icon: "https://placehold.co/40x40/ffc107/000000?text=SGB",
  },
  {
    category: "Home Insurance",
    company: "ICICI Lombard",
    policyNumber: "12345",
    lifeCover: "Rs 2.2 Cr",
    coverTillAge: "82yrs",
    claimSettled: "99.4%",
    annualCommission: "33%",
    icon: "https://placehold.co/40x40/4e5d94/ffffff?text=ICL",
  },
  {
    category: "Home Insurance",
    company: "Future Generali",
    policyNumber: "67890",
    lifeCover: "Rs 1.1 Cr",
    coverTillAge: "72yrs",
    claimSettled: "98.9%",
    annualCommission: "28%",
    icon: "https://placehold.co/40x40/00bcd4/ffffff?text=FUG",
  },
  {
    category: "Car Insurance",
    company: "PNB",
    policyNumber: "55667",
    lifeCover: "Rs 30 Lac",
    coverTillAge: "60yrs",
    claimSettled: "96.5%",
    annualCommission: "18%",
    icon: "https://placehold.co/40x40/800000/ffffff?text=PNB",
  },
  {
    category: "Car Insurance",
    company: "Aditya Birla",
    policyNumber: "88990",
    lifeCover: "Rs 70 Lac",
    coverTillAge: "65yrs",
    claimSettled: "97.8%",
    annualCommission: "26%",
    icon: "https://placehold.co/40x40/ffc107/000000?text=ABG",
  },
  {
    category: "Car Insurance",
    company: "Bajaj Allianz",
    policyNumber: "11223",
    lifeCover: "Rs 10 Lac",
    coverTillAge: "55yrs",
    claimSettled: "97.0%",
    annualCommission: "20%",
    icon: "https://placehold.co/40x40/a62c11/ffffff?text=BJA",
  },
  {
    category: "Car Insurance",
    company: "HDFC ERGO",
    policyNumber: "44556",
    lifeCover: "Rs 15 Lac",
    coverTillAge: "60yrs",
    claimSettled: "98.1%",
    annualCommission: "28%",
    icon: "https://placehold.co/40x40/ff9800/ffffff?text=HFC",
  },
  {
    category: "Car Insurance",
    company: "ICICI Lombard",
    policyNumber: "77889",
    lifeCover: "Rs 20 Lac",
    coverTillAge: "65yrs",
    claimSettled: "99.2%",
    annualCommission: "32%",
    icon: "https://placehold.co/40x40/4e5d94/ffffff?text=ICL",
  },
  {
    category: "Car Insurance",
    company: "Royal Sundaram",
    policyNumber: "99001",
    lifeCover: "Rs 25 Lac",
    coverTillAge: "70yrs",
    claimSettled: "98.8%",
    annualCommission: "29%",
    icon: "https://placehold.co/40x40/ffeb3b/000000?text=RYS",
  },
  {
    category: "Car Insurance",
    company: "Go Digit",
    policyNumber: "22334",
    lifeCover: "Rs 30 Lac",
    coverTillAge: "75yrs",
    claimSettled: "99.6%",
    annualCommission: "38%",
    icon: "https://placehold.co/40x40/009688/ffffff?text=GDG",
  },
  {
    category: "Car Insurance",
    company: "Future Generali",
    policyNumber: "55667",
    lifeCover: "Rs 35 Lac",
    coverTillAge: "60yrs",
    claimSettled: "96.5%",
    annualCommission: "18%",
    icon: "https://placehold.co/40x40/00bcd4/ffffff?text=FUG",
  },
  {
    category: "Car Insurance",
    company: "Bharti AXA",
    policyNumber: "88990",
    lifeCover: "Rs 40 Lac",
    coverTillAge: "65yrs",
    claimSettled: "97.8%",
    annualCommission: "26%",
    icon: "https://placehold.co/40x40/673ab7/ffffff?text=BHA",
  },
  {
    category: "Car Insurance",
    company: "Reliance",
    policyNumber: "65432",
    lifeCover: "Rs 45 Lac",
    coverTillAge: "70yrs",
    claimSettled: "98.9%",
    annualCommission: "31%",
    icon: "https://placehold.co/40x40/f44336/ffffff?text=REL",
  },
  {
    category: "Car Insurance",
    company: "Acko",
    policyNumber: "91827",
    lifeCover: "Rs 50 Lac",
    coverTillAge: "62yrs",
    claimSettled: "99.1%",
    annualCommission: "22%",
    icon: "https://placehold.co/40x40/333333/ffffff?text=ACK",
  },
];

const categories = [
  "Life Insurance",
  "Health Insurance",
  "Home Insurance",
  "Car Insurance",
];

// Reusable component for a single policy card
const PolicyCard: React.FC<{
  policy: Policy;
  onAdd?: (policy: Policy) => void;
  onRemove?: (policyNumber: string) => void;
  isShortlisted: boolean;
  onSelectForCompare?: (policy: Policy) => void;
  isSelected?: boolean;
}> = ({ policy, onAdd, onRemove, isShortlisted, onSelectForCompare, isSelected }) => (
  <div
    className={`
      relative flex-shrink-0 p-6 rounded-3xl border border-gray-200 cursor-pointer
      bg-white font-inter transition-all duration-300 ease-out
      shadow-lg hover:shadow-2xl hover:-translate-y-2
      w-full sm:w-[300px] mb-4 sm:mr-4
      ${isSelected ? 'border-4 border-teal-500' : ''}
    `}
    onClick={() => onSelectForCompare && onSelectForCompare(policy)}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Image
          src={policy.icon}
          alt={`${policy.company} logo`}
          className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
        />
        <span className="ml-3 font-semibold text-lg text-gray-900 flex items-center gap-2">
          {policy.company} – {policy.policyNumber}
          <button
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Info clicked for", policy.policyNumber);
            }}
          >
            <Info size={18} />
          </button>
        </span>
      </div>
    </div>

    {/* Policy Details */}
    <div className="grid grid-cols-2 gap-y-5 text-sm text-gray-600">
      <div>
        <div className="font-medium">Life Cover</div>
        <div className="font-bold text-gray-900">{policy.lifeCover}</div>
      </div>
      <div>
        <div className="font-medium">Cover till age</div>
        <div className="font-bold text-gray-900">{policy.coverTillAge}</div>
      </div>
      <div>
        <div className="font-medium">Claim Settled</div>
        <div className="font-bold text-green-600">{policy.claimSettled}</div>
      </div>
      <div>
        <div className="font-medium">Annual Commission</div>
        <div className="font-bold text-teal-600">{policy.annualCommission}</div>
      </div>
    </div>

    {/* Footer */}
    <div className="absolute bottom-6 left-6 right-6">
  {isShortlisted ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onRemove) {
          onRemove(policy.policyNumber);
        }
      }}
      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
    >
      Remove from Shortlist
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onAdd) {
          onAdd(policy);
        }
      }}
      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all"
    >
      Add to Shortlist
    </button>
  )}
</div>
  </div>
);

const PolicyComparisonTable: React.FC<{ policies: Policy[]; onBack: () => void }> = ({ policies, onBack }) => {
  const [policy1, policy2] = policies;
  const properties = Object.keys(policiesData[0]).filter(key => key !== 'icon' && key !== 'category' && key !== 'company' && key !== 'policyNumber');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Compare Policies</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left font-inter rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-4 px-6 font-medium text-sm rounded-tl-xl">Property</th>
              <th className="py-4 px-6 font-semibold text-lg">{policy1.company}</th>
              <th className="py-4 px-6 font-semibold text-lg rounded-tr-xl">{policy2.company}</th>
            </tr>
            <tr className="border-b border-gray-200 text-gray-600">
              <td className="py-2 px-6 text-sm">Policy Number</td>
              <td className="py-2 px-6">{policy1.policyNumber}</td>
              <td className="py-2 px-6">{policy2.policyNumber}</td>
            </tr>
          </thead>
          <tbody>
            {properties.map((key) => (
              <tr key={key} className="border-b border-gray-200 last:border-b-0">
                <td className="py-3 px-6 font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </td>
                <td className="py-3 px-6 text-gray-900">{policy1[key as keyof Policy]}</td>
                <td className="py-3 px-6 text-gray-900">{policy2[key as keyof Policy]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const ComparePolicies = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showListView, setShowListView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [shortlistedPolicies, setShortlistedPolicies] = useState<Policy[]>([]);
  const [policies, setPolicies] = useState<Policy[]>(policiesData);
  const [selectedPoliciesToCompare, setSelectedPoliciesToCompare] = useState<Policy[]>([]);
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  const handleViewAllPolicies = (category: string) => {
    setSelectedCategory(category);
    setShowListView(true);
  };

  const handleAddShortlist = (policy: Policy) => {
    if (!shortlistedPolicies.find((p) => p.policyNumber === policy.policyNumber)) {
      setShortlistedPolicies([...shortlistedPolicies, policy]);
      setPolicies(policies.filter((p) => p.policyNumber !== policy.policyNumber));
    }
  };

  const handleRemoveShortlist = (policyNumber: string) => {
    const removedPolicy = shortlistedPolicies.find(
      (p) => p.policyNumber === policyNumber
    );
    if (removedPolicy) {
      setShortlistedPolicies(
        shortlistedPolicies.filter((p) => p.policyNumber !== policyNumber)
      );
      setPolicies([...policies, removedPolicy].sort((a, b) => a.policyNumber.localeCompare(b.policyNumber)));
    }
  };

  const handleSelectForCompare = (policy: Policy) => {
    setSelectedPoliciesToCompare((prevSelected) => {
      if (prevSelected.find((p) => p.policyNumber === policy.policyNumber)) {
        return prevSelected.filter((p) => p.policyNumber !== policy.policyNumber);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, policy];
      }
      return prevSelected;
    });
  };

  const handleCompareClick = () => {
    if (selectedPoliciesToCompare.length === 2) {
      setShowComparisonTable(true);
    }
  };

  const handleBackToShortlist = () => {
    setShowComparisonTable(false);
    setSelectedPoliciesToCompare([]);
  };

  const policiesForCategory = policies.filter(
    (policy) => policy.category === selectedCategory
  );
  
  const allShortlistedPolicyNumbers = new Set(shortlistedPolicies.map(p => p.policyNumber));

  if (showComparisonTable) {
    return <PolicyComparisonTable policies={selectedPoliciesToCompare} onBack={handleBackToShortlist} />;
  }

  return (
    <div className="p-6 min-h-screen font-inter">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
        Compare policies offered by different companies across different policy types
      </h1>
      
      {/* Tabs */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          className={`py-2 px-6 rounded-full font-semibold transition-colors ${
            activeTab === "all"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveTab("all");
            setShowListView(false);
          }}
        >
          All Policies
        </button>
        <button
          className={`py-2 px-6 rounded-full font-semibold transition-colors ${
            activeTab === "shortlisted"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveTab("shortlisted");
            setShowListView(true);
            setSelectedCategory("Shortlisted Policies");
          }}
        >
          Shortlisted Policies ({shortlistedPolicies.length})
        </button>
      </div>

      {showListView ? (
        // List View for All Policies or Shortlisted Policies
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4 space-x-4">
            <div className="flex items-center space-x-4">
              {selectedCategory !== "Shortlisted Policies" && (
                <button
                  onClick={() => setShowListView(false)}
                  className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-xl font-semibold text-gray-800">{selectedCategory}</h2>
            </div>
            {activeTab === "shortlisted" && (
              <button
                onClick={handleCompareClick}
                disabled={selectedPoliciesToCompare.length !== 2}
                className={`py-2 px-6 rounded-full font-semibold transition-colors
                  ${selectedPoliciesToCompare.length === 2 ? "bg-teal-500 text-white hover:bg-teal-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Compare Policies
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh]">
            {selectedCategory === "Shortlisted Policies"
              ? shortlistedPolicies.map((policy: Policy, index: number) => (
                  <PolicyCard 
                    key={index} 
                    policy={policy} 
                    onRemove={handleRemoveShortlist} 
                    isShortlisted={true} 
                    onSelectForCompare={handleSelectForCompare}
                    isSelected={selectedPoliciesToCompare.some(p => p.policyNumber === policy.policyNumber)}
                  />
                ))
              : policiesForCategory.map((policy: Policy, index: number) => (
                  <PolicyCard
                    key={index}
                    policy={policy}
                    onAdd={handleAddShortlist}
                    isShortlisted={allShortlistedPolicyNumbers.has(policy.policyNumber)}
                  />
                ))}
          </div>
        </div>
      ) : (
        // Main View with horizontal scroll
        <div>
          {categories.map((category: string) => (
            <div key={category} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <Filter size={20} className="mr-1" />
                    Filter
                  </button>
                  <button
                    onClick={() => handleViewAllPolicies(category)}
                    className="flex items-center px-4 py-2 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-colors"
                  >
                    View All Policies
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">
                {policies
                  .filter((p) => p.category === category)
                  .slice(0, 10) // Display max 10 cards initially
                  .map((policy: Policy, index: number) => (
                    <PolicyCard
                      key={index}
                      policy={policy}
                      onAdd={handleAddShortlist}
                      isShortlisted={allShortlistedPolicyNumbers.has(policy.policyNumber)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparePolicies;
