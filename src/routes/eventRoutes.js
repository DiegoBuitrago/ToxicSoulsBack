import { Router } from "express";
import * as eventController from '../controllers/eventController';

const router = Router();

//get routes
router.get('/', eventController.getEvents);
router.get('/:_id', eventController.getEventById)

//post routes
router.post('/add-event', /*middlewares*/ eventController.createEvent);

//put routes
router.put('/:_id', /*middlewares*/ eventController.editEvent);
//delete routes
router.delete('/:_id', eventController.deleteEvent);

export default router;