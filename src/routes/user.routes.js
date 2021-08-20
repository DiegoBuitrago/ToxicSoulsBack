import { Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();


//get routes
router.get('/', userController.getUsers);

//post routes

router.post('/add-user', /*middlewares*/ userController.registerUser);

router.post('/login-user', userController.loginUser);

//put routes

//delete routes

export default router;