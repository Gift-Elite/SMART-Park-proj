import React, { useState } from 'react';
import { salaryAPI } from '../api/axios';

const Reports = () => {
  const [month, setMonth] = useState('');
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!month) {
      setError('Please select a month');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await salaryAPI.getMonthlyPayroll(month);
      setPayroll(res.data);
      
      if (res.data.length === 0) {
        setError('No payroll records found for the selected month');
      }
    } catch (err) {
      setError('Failed to fetch payroll report');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotals = () => {
    const totalNetSalary = payroll.reduce((sum, emp) => sum + emp.NetSalary, 0);
    return totalNetSalary;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Monthly Payroll Reports</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">Select Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-orange-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Search
            </button>
            {payroll.length > 0 && (
              <button
                type="button"
                onClick={handlePrint}
                className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Print
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Payroll Table */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      ) : payroll.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden print:shadow-none">
          <div className="p-6 border-b print:border-b print:page-break-before">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Monthly Payroll Report</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Month:</span> {month}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Employees:</span> {payroll.length}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">First Name</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Last Name</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Position</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Department</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Net Salary (RWF)</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map((emp, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 print:hover:bg-white">
                    <td className="px-6 py-3 text-gray-800">{emp.FirstName}</td>
                    <td className="px-6 py-3 text-gray-800">{emp.LastName}</td>
                    <td className="px-6 py-3 text-gray-800">{emp.Position}</td>
                    <td className="px-6 py-3 text-gray-800">{emp.DepartmentName}</td>
                    <td className="px-6 py-3 text-gray-800 font-semibold text-green-600">
                      {emp.NetSalary.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100 border-t-2 border-gray-400">
                <tr>
                  <td colSpan="4" className="px-6 py-3 text-right font-bold text-gray-800">
                    Total Monthly Payroll:
                  </td>
                  <td className="px-6 py-3 font-bold text-green-600 text-lg">
                    {calculateTotals().toLocaleString()} RWF
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Report Generated:</span> {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">Select a month to generate the payroll report</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
