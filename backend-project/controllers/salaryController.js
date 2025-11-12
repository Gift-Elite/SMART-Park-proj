const pool = require('../config/db');

// Get all salaries
exports.getAllSalaries = async (req, res) => {
  try {
    const [salaries] = await pool.query(`
      SELECT s.*, e.FirstName, e.LastName, e.Position, d.DepartmentName
      FROM Salary s
      JOIN Employee e ON s.EmployeeNumber = e.EmployeeNumber
      JOIN Department d ON e.DepartmentCode = d.DepartmentCode
      ORDER BY s.MonthOfPayment DESC, e.FirstName
    `);
    res.json(salaries);
  } catch (error) {
    console.error('Error fetching salaries:', error);
    res.status(500).json({ error: 'Failed to fetch salaries' });
  }
};

// Create new salary
exports.createSalary = async (req, res) => {
  const { employeeNumber, grossSalary, totalDeduction, monthOfPayment } = req.body;

  if (!employeeNumber || !grossSalary || totalDeduction === undefined || !monthOfPayment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const netSalary = grossSalary - totalDeduction;

  try {
    const [result] = await pool.query(
      'INSERT INTO Salary (EmployeeNumber, GrossSalary, TotalDeduction, NetSalary, MonthOfPayment) VALUES (?, ?, ?, ?, ?)',
      [employeeNumber, grossSalary, totalDeduction, netSalary, monthOfPayment]
    );
    
    res.status(201).json({ 
      message: 'Salary record created successfully',
      salaryId: result.insertId,
      netSalary: netSalary
    });
  } catch (error) {
    console.error('Error creating salary:', error);
    res.status(500).json({ error: 'Failed to create salary record' });
  }
};

// Get salary by ID
exports.getSalaryById = async (req, res) => {
  const { id } = req.params;

  try {
    const [salary] = await pool.query(`
      SELECT s.*, e.FirstName, e.LastName, e.Position, d.DepartmentName
      FROM Salary s
      JOIN Employee e ON s.EmployeeNumber = e.EmployeeNumber
      JOIN Department d ON e.DepartmentCode = d.DepartmentCode
      WHERE s.SalaryID = ?
    `, [id]);
    
    if (salary.length === 0) {
      return res.status(404).json({ error: 'Salary record not found' });
    }
    
    res.json(salary[0]);
  } catch (error) {
    console.error('Error fetching salary:', error);
    res.status(500).json({ error: 'Failed to fetch salary record' });
  }
};

// Update salary
exports.updateSalary = async (req, res) => {
  const { id } = req.params;
  const { employeeNumber, grossSalary, totalDeduction, monthOfPayment } = req.body;

  if (!employeeNumber || !grossSalary || totalDeduction === undefined || !monthOfPayment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const netSalary = grossSalary - totalDeduction;

  try {
    const [result] = await pool.query(
      'UPDATE Salary SET EmployeeNumber = ?, GrossSalary = ?, TotalDeduction = ?, NetSalary = ?, MonthOfPayment = ? WHERE SalaryID = ?',
      [employeeNumber, grossSalary, totalDeduction, netSalary, monthOfPayment, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Salary record not found' });
    }
    
    res.json({ message: 'Salary record updated successfully', netSalary: netSalary });
  } catch (error) {
    console.error('Error updating salary:', error);
    res.status(500).json({ error: 'Failed to update salary record' });
  }
};

// Delete salary
exports.deleteSalary = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM Salary WHERE SalaryID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Salary record not found' });
    }
    
    res.json({ message: 'Salary record deleted successfully' });
  } catch (error) {
    console.error('Error deleting salary:', error);
    res.status(500).json({ error: 'Failed to delete salary record' });
  }
};

// Get monthly payroll report
exports.getMonthlyPayroll = async (req, res) => {
  const { month } = req.query;

  try {
    let query = `
      SELECT e.FirstName, e.LastName, e.Position, d.DepartmentName, s.NetSalary, s.MonthOfPayment
      FROM Salary s
      JOIN Employee e ON s.EmployeeNumber = e.EmployeeNumber
      JOIN Department d ON e.DepartmentCode = d.DepartmentCode
    `;
    
    const params = [];
    
    if (month) {
      query += ' WHERE s.MonthOfPayment = ?';
      params.push(month);
    }
    
    query += ' ORDER BY e.FirstName, e.LastName';
    
    const [payroll] = await pool.query(query, params);
    res.json(payroll);
  } catch (error) {
    console.error('Error fetching payroll:', error);
    res.status(500).json({ error: 'Failed to fetch payroll report' });
  }
};
