import { Router } from "express";
import * as artistController from '../controllers/artistController';

const router = Router();

//get routes
router.get('/', artistController.getArtists);
router.get('/:_id', artistController.getArtistById)

//post routes
router.post('/add-artist', /*middlewares*/ artistController.createArtist);

//put routes
router.put('/:_id', /*middlewares*/ artistController.editArtist);
//delete routes
router.delete('/:_id', artistController.deleteArtist);

export default router;