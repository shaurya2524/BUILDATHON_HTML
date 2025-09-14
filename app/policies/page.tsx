"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const policyData = [
  {
    id: '1',
    customer: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    policyNumber: 'HDFC-LI-2024-001',
    type: 'Term Life',
    premium: '₹25,000',
    renewalDate: '2024-03-15',
    status: 'Active',
    paymentStatus: 'Paid',
  },
  {
    id: '2',
    customer: 'Priya Sharma',
    phone: '+91 87654 32109',
    policyNumber: 'ICICI-PRU-2023-010',
    type: 'Health',
    premium: '₹18,500',
    renewalDate: '2024-09-20',
    status: 'Active',
    paymentStatus: 'Paid',
  },
  {
    id: '3',
    customer: 'Amit Patel',
    phone: '+91 90123 45678',
    policyNumber: 'MAX-LIFE-2024-005',
    type: 'Motor',
    premium: '₹12,000',
    renewalDate: '2024-06-10',
    status: 'Due this month',
    paymentStatus: 'Pending',
  },
  {
    id: '4',
    customer: 'Anjali Singh',
    phone: '+91 99887 76655',
    policyNumber: 'HDFC-LI-2023-025',
    type: 'Term Life',
    premium: '₹15,000',
    renewalDate: '2024-01-30',
    status: 'Overdue',
    paymentStatus: 'Pending',
  },
];

const App = () => {
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const totalPolicies = policyData.length;
  const activePolicies = policyData.filter(p => p.status === 'Active').length;
  const dueThisMonth = policyData.filter(p => p.status === 'Due this month').length;
  const overdue = policyData.filter(p => p.status === 'Overdue').length;

  const filteredPolicies = policyData.filter(policy => {
    const matchesStatus = filterStatus === 'All Status' || policy.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
                          policy.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Due this month':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) as File[] : [];
    setUploadedFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files) as File[];
      setUploadedFiles(files);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUploadedFiles([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Policy Management</h1>
            <p className="text-gray-600">Manage all customer policies in one place</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Upload Policy</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Policies */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Policies</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M3.75 12a8.25 8.25 0 0116.5 0" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalPolicies}</div>
            <p className="text-sm text-gray-500">+12 from last month</p>
          </motion.div>

          {/* Active Policies */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">Active Policies</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M3.75 12a8.25 8.25 0 0116.5 0" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{activePolicies}</div>
            <p className="text-sm text-gray-500">+8 from last month</p>
          </motion.div>

          {/* Due This Month */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">Due This Month</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v12m0 0l-3.75-3.75M6.75 15L3 18.75m3.75-3.75A2.25 2.25 0 019 12a2.25 2.25 0 012.25 2.25V21" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{dueThisMonth}</div>
            <p className="text-sm text-gray-500">2 from last month</p>
          </motion.div>

          {/* Overdue */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v12m0 0l-3.75-3.75M6.75 15L3 18.75m3.75-3.75A2.25 2.25 0 019 12a2.25 2.25 0 012.25 2.25V21" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{overdue}</div>
            <p className="text-sm text-gray-500">5 from last month</p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search policies or customers..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.594 5.558L21.56 21.56a.75.75 0 11-1.06-1.06l-4.722-4.722A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            className="block rounded-md border-gray-300 shadow-sm focus:border-emerald-500 text-black focus:ring-emerald-500 sm:text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Due this month</option>
            <option>Overdue</option>
          </select>
          {/* <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-.15 0-.294.025-.432.067l-2.493.791c-1.52.484-2.455 2.127-1.97 3.647L8.71 12l-2.493.791C4.698 14.28 4.698 16.72 6.13 18.252a1.056 1.056 0 01-.002.002L12 21.75a1.056 1.056 0 010 0v-2.25a1.5 1.5 0 00-1.5-1.5h-1.5a1.5 1.5 0 00-1.5 1.5v2.25a1.056 1.056 0 01-1.056 1.056H4.5a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h2.25a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5h-2.25a1.5 1.5 0 01-1.5-1.5V3a1.5 1.5 0 011.5-1.5h2.25a1.5 1.5 0 001.5-1.5zM12 3c.15 0 .294.025.432.067l2.493.791c1.52.484 2.455 2.127 1.97 3.647L15.29 12l2.493.791C19.302 14.28 19.302 16.72 17.87 18.252a1.056 1.056 0 01-.002.002L12 21.75a1.056 1.056 0 010 0v-2.25a1.5 1.5 0 001.5-1.5h1.5a1.5 1.5 0 001.5 1.5v2.25a1.056 1.056 0 011.056 1.056h2.25a1.5 1.5 0 011.5-1.5V12a1.5 1.5 0 01-1.5-1.5h-2.25a1.5 1.5 0 00-1.5-1.5V6.75a1.5 1.5 0 001.5-1.5h2.25a1.5 1.5 0 011.5-1.5V3a1.5 1.5 0 01-1.5-1.5h-2.25a1.5 1.5 0 00-1.5-1.5z" />
            </svg>
          </button> */}
        </div>

        {/* Policies Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Policies ({filteredPolicies.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{policy.customer}</div>
                      <div className="text-xs text-gray-500">{policy.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.policyNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{policy.premium}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.renewalDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentColor(policy.paymentStatus)}`}>
                        {policy.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <a href="#" className="text-gray-500 hover:text-emerald-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 4.5H5.625c-1.036 0-1.875.84-1.875 1.875v10.125c0 1.036.84 1.875 1.875 1.875h10.125c1.036 0 1.875-.84 1.875-1.875V13.875m-6.75 3.375l-4.5-4.5m4.5 4.5l4.5-4.5m-4.5 4.5V11.25m4.5 4.5l4.5-4.5m-4.5-4.5V5.625M17.625 12a1.875 1.875 0 00-1.875 1.875M17.625 12a1.875 1.875 0 011.875-1.875" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-emerald-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.182.44L14.47 17.5a19.167 19.167 0 01-2.326-3.04l-.066-.088-.066-.088a19.167 19.167 0 01-3.04-2.326l-1.424-1.424c-.385-.28-.55-.742-.44-1.182L5.44 5.597c-.125-.501-.575-.852-1.091-.852H2.25A2.25 2.25 0 000 6.75z" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-emerald-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Upload Policies</h2>
                <button onClick={handleModalClose} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 hover:border-emerald-500 hover:bg-gray-50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                // onClick={() => document.getElementById('file-upload').click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4v-1a4 4 0 014-4h4a4 4 0 014 4v1a4 4 0 014 4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <p className="mt-2 text-sm font-medium">Drag and drop files here, or click to browse</p>
                <p className="text-xs mt-1 text-gray-400">PDF, JPG, PNG, CSV up to 10MB</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 max-h-48 overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
                  <ul className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-black text-sm">
                        <span className="truncate">{file.name}</span>
                        <button 
                          onClick={() => setUploadedFiles(uploadedFiles.filter((f, i) => i !== index))}
                          className="text-gray-500 hover:text-red-700 ml-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 text-sm font-semibold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
