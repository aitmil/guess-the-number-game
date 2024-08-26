import { Router } from 'express';
import {
  generateNumberController,
  guessNumberController,
} from '../controllers/numbers.js';

const router = Router();

router.post('/start_game', generateNumberController);

router.post('/guess', guessNumberController);

export default router;
