const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, departmentController.getAllDepartments);
router.post('/', isAuthenticated, departmentController.createDepartment);
router.get('/:code', isAuthenticated, departmentController.getDepartmentByCode);

module.exports = router;
