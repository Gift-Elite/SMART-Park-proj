const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, salaryController.getAllSalaries);
router.post('/', isAuthenticated, salaryController.createSalary);
router.get('/report/monthly', isAuthenticated, salaryController.getMonthlyPayroll);
router.get('/:id', isAuthenticated, salaryController.getSalaryById);
router.put('/:id', isAuthenticated, salaryController.updateSalary);
router.delete('/:id', isAuthenticated, salaryController.deleteSalary);

module.exports = router;
