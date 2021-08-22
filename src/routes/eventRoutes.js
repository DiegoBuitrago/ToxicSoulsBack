import { Router } from "express";
import * as eventController from '../controllers/eventController';

const router = Router();


//get routes
router.get('/', eventController.getEvents);

//post routes
router.post('/add-event', /*middlewares*/ eventController.createEvent);

//put routes

//delete routes

export default router;