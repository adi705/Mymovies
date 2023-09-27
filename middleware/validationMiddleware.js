import { body, param, validationResult } from 'express-validator';
import { UnauthorizedError, BadRequestError, NotFoundError, } from '../errors/custom-errors.js';
import mongoose from 'mongoose';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('no movie')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
    
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
   
    
  ]);
  
  export const validateLoginInput = withValidationErrors([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),

    body('password').notEmpty().withMessage('password is required'),
  ]);