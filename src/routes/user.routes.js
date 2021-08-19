import { Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();


//get routes
router.get('/', userController.getUsers);

//post routes

router.post('/add-user', /*middlewares*/ userController.registerUser);

//put routes

//delete routes

export default router;