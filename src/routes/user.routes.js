import { Router } from "express";
import * as userController from '../controllers/userController';
import { isAdmin } from "../middlewares/verifyRole";
import { verifyToken } from '../middlewares/verifyAuth';


const router = Router();


//get routes

router.get('/', [verifyToken, isAdmin], userController.getUsers);
router.get('/:_id', [verifyToken, isAdmin], userController.getUserById);

//post routes

router.post('/add-user', [verifyToken, isAdmin],  userController.registerUser);

router.post('/login-user', userController.loginUser);

router.post('/email-confirm', userController.emailConfirm);

//put routes

router.put('/:_id', verifyToken, userController.editUser);

//delete routes

router.delete('/:_id', [verifyToken, isAdmin], userController.deleteUser);

export default router;