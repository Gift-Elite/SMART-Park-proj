const pool = require('../config/db');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const [departments] = await pool.query('SELECT * FROM Department');
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

// Create new department
exports.createDepartment = async (req, res) => {
  const { departmentCode, departmentName, grossSalary, totalDeduction } = req.body;

  if (!departmentCode || !departmentName || !grossSalary || totalDeduction === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO Department (DepartmentCode, DepartmentName, GrossSalary, TotalDeduction) VALUES (?, ?, ?, ?)',
      [departmentCode, departmentName, grossSalary, totalDeduction]
    );
    
    res.status(201).json({ message: 'Department created successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Department code already exists' });
    }
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
};

// Get department by code
exports.getDepartmentByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const [department] = await pool.query(
      'SELECT * FROM Department WHERE DepartmentCode = ?',
      [code]
    );
    
    if (department.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json(department[0]);
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'Failed to fetch department' });
  }
};
