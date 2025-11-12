const pool = require('../config/db');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const [employees] = await pool.query(`
      SELECT e.*, d.DepartmentName 
      FROM Employee e 
      LEFT JOIN Department d ON e.DepartmentCode = d.DepartmentCode
    `);
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// Create new employee
exports.createEmployee = async (req, res) => {
  const { firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode } = req.body;

  if (!firstName || !lastName || !address || !position || !telephone || !gender || !hiredDate || !departmentCode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO Employee (FirstName, LastName, Address, Position, Telephone, Gender, HiredDate, DepartmentCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode]
    );
    
    res.status(201).json({ 
      message: 'Employee created successfully',
      employeeNumber: result.insertId 
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [employee] = await pool.query(
      'SELECT e.*, d.DepartmentName FROM Employee e LEFT JOIN Department d ON e.DepartmentCode = d.DepartmentCode WHERE e.EmployeeNumber = ?',
      [id]
    );
    
    if (employee.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee[0]);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};
