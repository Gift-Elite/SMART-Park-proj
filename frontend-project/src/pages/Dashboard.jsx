import React, { useState, useEffect } from 'react';
import { employeeAPI, departmentAPI, salaryAPI } from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalSalaries: 0,
    totalNetSalaries: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [empRes, deptRes, salRes] = await Promise.all([
        employeeAPI.getAll(),
        departmentAPI.getAll(),
        salaryAPI.getAll()
      ]);

      const totalNetSalaries = salRes.data.reduce((sum, salary) => sum + salary.NetSalary, 0);

      setStats({
        totalEmployees: empRes.data.length,
        totalDepartments: deptRes.data.length,
        totalSalaries: salRes.data.length,
        totalNetSalaries: totalNetSalaries
      });
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 shadow-md">
          <p className="text-gray-600 font-semibold">Total Employees</p>
          <p className="text-4xl font-bold text-blue-600">{stats.totalEmployees}</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 shadow-md">
          <p className="text-gray-600 font-semibold">Departments</p>
          <p className="text-4xl font-bold text-green-600">{stats.totalDepartments}</p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 shadow-md">
          <p className="text-gray-600 font-semibold">Salary Records</p>
          <p className="text-4xl font-bold text-purple-600">{stats.totalSalaries}</p>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 shadow-md">
          <p className="text-gray-600 font-semibold">Total Net Salaries</p>
          <p className="text-2xl font-bold text-orange-600">{stats.totalNetSalaries.toLocaleString()} RWF</p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">System Information</h2>
          <ul className="space-y-3 text-gray-700">
            <li><span className="font-semibold">System:</span> SmartPark EPMS</li>
            <li><span className="font-semibold">Version:</span> 1.0.0</li>
            <li><span className="font-semibold">Purpose:</span> Employee Payroll Management</li>
            <li><span className="font-semibold">Location:</span> Rubavu District, Rwanda</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/employees" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add New Employee
            </a>
            <a href="/departments" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Add New Department
            </a>
            <a href="/salaries" className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Create Salary Record
            </a>
            <a href="/reports" className="block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
              View Reports
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
