"use client";

import React from "react";
import { ApiPolicy } from "@/app/models/customer";

interface PolicyDetailsFormProps {
  policy: ApiPolicy;
}

const PolicyDetailsForm: React.FC<PolicyDetailsFormProps> = ({ policy }) => {
  if (!policy) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Policy Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-black">Policy Name:</p>
          <p className="text-black">{policy.policy_name || policy.policyName || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Join date:</p>
          <p className="text-black">{policy.joinDate || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Premium:</p>
          <p className="text-black">{policy.premium || "-"}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Renewal Date:</p>
          <p className="text-black">{policy.renewalDate || "-"}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              policy.status === "Pending"
                ? "bg-yellow-400 text-black"
                : "bg-green-600 text-white"
            }`}
          >
            {policy.status || "unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsForm;
