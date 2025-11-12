const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, employeeController.getAllEmployees);
router.post('/', isAuthenticated, employeeController.createEmployee);
router.get('/:id', isAuthenticated, employeeController.getEmployeeById);

module.exports = router;
