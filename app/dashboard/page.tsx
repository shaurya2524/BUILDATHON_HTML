export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[34px] font-bold text-gray-900 font-inter">Hello Arnav!!</h1>
        <p className="text-[20px] text-gray-600 font-inter">
          Welcome back, here&apos;s your business overview
        </p>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-6">
        {/* Total Customers */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            {/* User icon */}
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
              <h2 className="text-[24px] font-inter">Total Customers</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"  strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
          </div>
          <p className="text-[44px] text-black font-bold">247</p>
          <span className="text-[14px] text-white/80">+12 from last month</span>
        </div>
          
        {/* Active Policies */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            {/* Document icon */}
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
            <h2 className="text-[24px] font-inter">Active Policies</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-3 4h.01M6 6h12v12H6V6z" />
            </svg>
            </div>
          </div>
          <p className="text-[44px] text-black font-bold">589</p>
          <span className="text-[14px] text-white/80">+12 from last month</span>
        </div>
          
        {/* Recommitments */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
              {/* Refresh/Repeat icon */}
              <div className="flex items-center justify-between mb-2 min-w-[250px] mb-1">
                  <h2 className="text-[24px] font-inter">Recommitments</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"  stroke="currentColor"  strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
              </div>
          </div>
          <p className="text-[44px] text-black font-bold">18</p>
          <span className="text-[14px] text-white/80">This Week</span>
        </div>
          
        {/* Claims in Progress */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            {/* Clock/Progress icon */}
            <div className="flex items-center justify-between mb-1 min-w-[250px]">
            <h2 className="text-[24px] font-inter">Claims in Progress</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m0 6a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
            </div>
          </div>
          <p className="text-[44px] text-black font-bold">7</p>
          <span className="text-[14px] text-white/80">-2 from last month</span>
        </div>
      </div>

      {/* Priority Renewals */}
      <div className="bg-white rounded-[30px] shadow p-6 overflow-y-auto max-h-[400px] 
              scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-black font-semibold text-xl">Priority Renewals</h2>
          <button className="px-3 py-1 bg-[#00BDAA] text-white rounded-md hover:opacity-90">
            View All Customers
          </button>
        </div>

        <div className="overflow-hidden  w-full">
          <table className="w-full text-left border-collapse text-[18px]">
            <thead>
              <tr className="bg-[#D9D9D9] text-black mb-2">
                <th className="py-3 px-4 rounded-tl-[30px]">Customer</th>
                <th className="py-3 px-4">Policy Number</th>
                <th className="py-3 px-4">Policies</th>
                <th className="py-3 px-4">Premium</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-[30px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Rajesh Kumar</td>
                <td className="py-3 px-4">LIC-965656565</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">25,000</td>
                <td className="py-3 px-4">
                  <span className="bg-red-300 text-white px-3 py-1 rounded-full">
                    due in 3 days
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>

              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Priya Sharma</td>
                <td className="py-3 px-4">LIC-874563210</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">28,500</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full">
                    due in 1 week
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>
              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Priya Sharma</td>
                <td className="py-3 px-4">LIC-874563210</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">28,500</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full">
                    due in 1 week
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>
              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Priya Sharma</td>
                <td className="py-3 px-4">LIC-874563210</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">28,500</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full">
                    due in 1 week
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>
              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Priya Sharma</td>
                <td className="py-3 px-4">LIC-874563210</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">28,500</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full">
                    due in 1 week
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>
              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Priya Sharma</td>
                <td className="py-3 px-4">LIC-874563210</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">28,500</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full">
                    due in 1 week
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>
              <tr className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                <td className="py-3 px-4">Priya Sharma</td>
                <td className="py-3 px-4">LIC-874563210</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">28,500</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full">
                    due in 1 week
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3 ">
                <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.                  55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                    </button>

                    {/* Mail Button */}
                    <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}
