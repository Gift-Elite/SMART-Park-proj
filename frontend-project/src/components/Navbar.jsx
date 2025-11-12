import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">SmartPark EPMS</h1>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-blue-200 transition font-semibold">
              Dashboard
            </Link>
            <Link to="/employees" className="hover:text-blue-200 transition font-semibold">
              Employees
            </Link>
            <Link to="/departments" className="hover:text-blue-200 transition font-semibold">
              Departments
            </Link>
            <Link to="/salaries" className="hover:text-blue-200 transition font-semibold">
              Salaries
            </Link>
            <Link to="/reports" className="hover:text-blue-200 transition font-semibold">
              Reports
            </Link>

            <div className="border-l border-blue-300 pl-6">
              <span className="text-sm">Welcome, <span className="font-bold">{user}</span></span>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
