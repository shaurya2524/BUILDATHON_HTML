"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const paymentData = [
  {
    id: '1',
    customer: 'Rajesh Kumar',
    lastPaid: '1/15/2023',
    policyNumber: 'LIC-789456123',
    premiumAmount: '₹25,000',
    dueDate: '1/15/2024',
    daysOverdue: -667,
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
  },
  {
    id: '2',
    customer: 'Priya Sharma',
    lastPaid: '1/10/2024',
    policyNumber: 'HDFC-456789012',
    premiumAmount: '₹18,500',
    dueDate: '1/20/2024',
    daysOverdue: 0,
    paymentMethod: 'UPI',
    status: 'Paid',
  },
];

const App = () => {
  const [filterStatus, setFilterStatus] = useState('All Payments');
  const [payments, setPayments] = useState(paymentData);

  const filteredPayments = payments.filter((payment) => {
    if (filterStatus === 'All Payments') {
      return true;
    }
    return payment.status === filterStatus;
  });

  const totalCollected = 33500;
  const totalPending = 79000;
  const collectionRate = 29.8;
  const overduePolicies = 1;

  const handleMarkPaid = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: 'Paid' } : payment
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Payment Tracking</h1>
            <p className="text-gray-600">Monitor premium collections and payment status across all policies</p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Collected */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">Total Collected</h3>
              <span className="text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-2h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2V9.5h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2V2.5h-1v4h-2V2.5H6.5v4h-2v1h2v2h2v1h-2v2h-2v1h2v4h1v-4h2v4h2v-4h1v4h2z" />
                </svg>
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{`₹${totalCollected.toLocaleString()}`}</div>
            <p className="text-sm text-gray-500">This month</p>
          </motion.div>

          {/* Total Pending */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">Total Pending</h3>
              <span className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{`₹${totalPending.toLocaleString()}`}</div>
            <p className="text-sm text-gray-500">Outstanding</p>
          </motion.div>

          {/* Collection Rate */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">Collection Rate</h3>
              <span className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{`${collectionRate}%`}</div>
            <p className="text-sm text-gray-500">This period</p>
          </motion.div>

          {/* Overdue Policies */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">Overdue Policies</h3>
              <span className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{overduePolicies}</div>
            <p className="text-sm text-gray-500">Needs attention</p>
          </motion.div>
        </div>

        {/* Collection Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Collection Summary</h2>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  Collection Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  ₹33,500 / ₹112,500
                </span>
              </div>
            </div>
            <div className="flex h-2 overflow-hidden text-xs rounded bg-gray-200">
              <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
              <div style={{ width: "40%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
              <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
              <div className="text-center">
                <span className="block text-emerald-600">Collected</span>
                <span className="block font-semibold">₹33,500</span>
              </div>
              <div className="text-center">
                <span className="block text-yellow-600">Pending</span>
                <span className="block font-semibold">₹47,000</span>
              </div>
              <div className="text-center">
                <span className="block text-red-600">Overdue</span>
                <span className="block font-semibold">₹32,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Filter by Status</span>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Payments</option>
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors">
                Export Report
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-colors">
                Send Reminders
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                      <div className="text-xs text-gray-500">Last paid: {payment.lastPaid}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.policyNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{payment.premiumAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{payment.dueDate}</div>
                      {payment.daysOverdue < 0 && (
                        <div className="text-xs text-red-500">{-payment.daysOverdue} days left</div>
                      )}
                      {payment.daysOverdue > 0 && (
                        <div className="text-xs text-red-500">{payment.daysOverdue} days overdue</div>
                      )}
                      {payment.daysOverdue === 0 && (
                        <div className="text-xs text-emerald-500">Paid on time</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {payment.status === 'Pending' && (
                          <button onClick={() => handleMarkPaid(payment.id)} className="text-emerald-600 hover:text-emerald-900">Mark Paid</button>
                        )}
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
    </div>
  );
};

export default App;
