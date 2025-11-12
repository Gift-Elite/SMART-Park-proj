import React, { useState, useEffect } from 'react';
import { salaryAPI, employeeAPI } from '../api/axios';

const Salaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employeeNumber: '',
    grossSalary: '',
    totalDeduction: '',
    monthOfPayment: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salRes, empRes] = await Promise.all([
        salaryAPI.getAll(),
        employeeAPI.getAll()
      ]);
      setSalaries(salRes.data);
      setEmployees(empRes.data);
    } catch (err) {
      setError('Failed to fetch data');
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
      if (editingId) {
        await salaryAPI.update(editingId, formData);
        setSuccess('Salary record updated successfully!');
        setEditingId(null);
      } else {
        await salaryAPI.create(formData);
        setSuccess('Salary record created successfully!');
      }
      
      setFormData({
        employeeNumber: '',
        grossSalary: '',
        totalDeduction: '',
        monthOfPayment: ''
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save salary record');
    }
  };

  const handleEdit = (salary) => {
    setEditingId(salary.SalaryID);
    setFormData({
      employeeNumber: salary.EmployeeNumber,
      grossSalary: salary.GrossSalary,
      totalDeduction: salary.TotalDeduction,
      monthOfPayment: salary.MonthOfPayment
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await salaryAPI.delete(id);
        setSuccess('Salary record deleted successfully!');
        fetchData();
      } catch (err) {
        setError('Failed to delete salary record');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      employeeNumber: '',
      grossSalary: '',
      totalDeduction: '',
      monthOfPayment: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Salary Management</h1>

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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? 'Edit Salary' : 'Add New Salary'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Employee</label>
                <select
                  name="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.EmployeeNumber} value={emp.EmployeeNumber}>
                      {emp.FirstName} {emp.LastName} ({emp.EmployeeNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gross Salary (RWF)</label>
                <input
                  type="number"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Month of Payment</label>
                <input
                  type="month"
                  name="monthOfPayment"
                  value={formData.monthOfPayment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              {formData.grossSalary && formData.totalDeduction && (
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-gray-700">
                    <span className="font-semibold">Net Salary:</span> {' '}
                    <span className="text-blue-600 font-bold">
                      {(Number(formData.grossSalary) - Number(formData.totalDeduction)).toLocaleString()} RWF
                    </span>
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  {editingId ? 'Update' : 'Add'} Salary
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-400 text-white font-bold py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 p-6">Salary Records</h2>
            {loading ? (
              <p className="p-6 text-gray-600">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold">Employee</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold">Gross</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold">Deduction</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold">Net</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold">Month</th>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaries.map((sal) => (
                      <tr key={sal.SalaryID} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{sal.FirstName} {sal.LastName}</td>
                        <td className="px-4 py-3 text-gray-800">{sal.GrossSalary.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-800">{sal.TotalDeduction.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-green-600">{sal.NetSalary.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-800">{sal.MonthOfPayment}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(sal)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(sal.SalaryID)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                          >
                            Delete
                          </button>
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

export default Salaries;
