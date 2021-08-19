import { Router } from "express";
import * as userController from '../controllers/userController';

const router = Router();


//get routes
router.get('/', (req, res) => res.send({message: 'Users module'}));

//post routes

router.post('/add-user', /*middlewares*/ userController.user);

//put routes

//delete routes

export default router;