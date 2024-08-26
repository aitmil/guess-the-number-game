import { generateNumber, guessNumber } from '../services/numbers.js';
import Joi from 'joi';

let generatedNumber = null;

export const generateNumberController = (req, res) => {
  generatedNumber = generateNumber();
  res.status(200).json({
    status: 200,
    message: 'Game started!',
    data: generatedNumber,
  });
};

export const guessNumberController = (req, res, next) => {
  const schema = Joi.object({
    guess: Joi.number().integer().min(1).max(100).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(error);
  }

  const result = guessNumber(value.guess, generatedNumber);

  res.status(200).json({
    status: 200,
    result,
  });
};
