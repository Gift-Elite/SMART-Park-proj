import React, { useState, useEffect } from 'react';
import { departmentAPI } from '../api/axios';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    departmentCode: '',
    departmentName: '',
    grossSalary: '',
    totalDeduction: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
    } catch (err) {
      setError('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await departmentAPI.create(formData);
      setSuccess('Department added successfully!');
      setFormData({
        departmentCode: '',
        departmentName: '',
        grossSalary: '',
        totalDeduction: ''
      });
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add department');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Department Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Department</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Department Code</label>
                <input
                  type="text"
                  name="departmentCode"
                  value={formData.departmentCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="e.g., CW"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gross Salary (RWF)</label>
                <input
                  type="number"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Total Deduction (RWF)</label>
                <input
                  type="number"
                  name="totalDeduction"
                  value={formData.totalDeduction}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add Department
              </button>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 p-6">Department List</h2>
            {loading ? (
              <p className="p-6 text-gray-600">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-700 font-semibold">Code</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-semibold">Gross Salary</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-semibold">Deduction</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-semibold">Net Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept) => (
                      <tr key={dept.DepartmentCode} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-800 font-semibold">{dept.DepartmentCode}</td>
                        <td className="px-6 py-3 text-gray-800">{dept.DepartmentName}</td>
                        <td className="px-6 py-3 text-gray-800">{dept.GrossSalary.toLocaleString()} RWF</td>
                        <td className="px-6 py-3 text-gray-800">{dept.TotalDeduction.toLocaleString()} RWF</td>
                        <td className="px-6 py-3 text-gray-800 font-semibold text-green-600">
                          {(dept.GrossSalary - dept.TotalDeduction).toLocaleString()} RWF
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
