import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../utils/validateRequest';
import { registerValidationSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(registerValidationSchema),
  AuthControllers.register,
);
router.post('/login', AuthControllers.login);

export const AuthRoutes = router;
