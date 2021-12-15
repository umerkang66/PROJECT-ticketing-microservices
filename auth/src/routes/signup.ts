import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';

const router = Router();

router.post(
  '/api/users/signup',
  [
    // Body is going to check the body of the incoming request
    body('email').isEmail().withMessage('Email that is provided must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters '),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in use');
      return res.send({});
    }

    // Building the user
    const user = User.build({ email, password });
    // Saving the user in database
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
