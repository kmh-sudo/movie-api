// src/routes/index.js
import { Router } from 'express';
import movieController from '../controllers/movieController.js';   
const router = Router();

router
  .route('/')
  .get(movieController.getMovie)
  .post(movieController.create);

router.route('/watch').post(movieController.watchMovie);
router.route('/watch-request').post(movieController.requestWatch);

router
  .route('/:id')
  .get(movieController.getMovieById)
  .put(movieController.update)
  .delete(movieController.delete);

export default router;