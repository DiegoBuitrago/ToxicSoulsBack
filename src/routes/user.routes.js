import { Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();


//get routes

router.get('/', userController.getUsers);
router.get('/:_id', userController.getUserById);

//post routes

router.post('/add-user', /*middlewares*/ userController.registerUser);

//put routes

router.put('/:_id', userController.editUser);

//delete routes

router.delete('/:_id', userController.deleteUser);

export default router;