import express from 'express';
import { deleteEmployee, getEmployees, signout, updateEmployee } from '../controllers/employee.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/signout', signout);
router.put("/update/:empId",verifyToken,updateEmployee);
router.get('/getemployee', verifyToken, getEmployees);
router.delete('/deleteemployee/:empId', verifyToken, deleteEmployee);

export default router;