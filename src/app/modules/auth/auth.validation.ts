import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(3, 'Name must be at least 3 characters long.')
      .max(32, 'The name cannot exceed 32 characters.'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email format')
      .max(54, 'Email cannot exceed 54 characters.'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .trim()
      .min(6, 'Password length minimum 6 characters')
      .max(20, 'Password length maximum 24 characters.'),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email format')
      .max(54, 'Email cannot exceed 54 characters.'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .trim()
      .min(6, 'Password length minimum 6 characters')
      .max(20, 'Password length maximum 24 characters.'),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
};
