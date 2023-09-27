import { Router } from 'express';
const router = Router();
import {
    getAllMovies,
    getMovie,
    updateMovie,
} from '../controllers/movies.js';


// validation middleware for checkecing if an id is a valid param


router.route('/').get(getAllMovies);
router.route('/:id').get(getMovie).patch(updateMovie);

export default router;