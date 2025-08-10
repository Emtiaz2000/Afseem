import { z } from 'zod';
import { Types } from 'mongoose';

export const registerValidationSchema = z.object({
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
        invalid_type_error: 'Password must be a string',
      })
      .trim()
      .min(6, 'Password length minimum 6 characters.')
      .max(24, 'Password length maximum 24 characters.'),

    shop: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid shop ID',
      })
      .optional(),

    image_url: z.string().url('Image URL must be a valid URL').optional(),

    ws_number: z
      .string({ required_error: 'WhatsApp number is required' })
      .trim(),

    person_address: z.object({
      locationMap: z.string().optional(),
      address: z
        .string({ required_error: 'Address is required' })
        .trim()
        .min(5, 'Address must be at least 5 characters long.'),
      street: z.string({ required_error: 'Street is required' }).trim(),
      zip: z.string({ required_error: 'ZIP code is required' }).trim(),
      city: z.string({ required_error: 'City is required' }).trim(),
      state: z.string({ required_error: 'State is required' }).trim(),
      country: z.string({ required_error: 'Country is required' }).trim(),
    }),

    isVerified: z.boolean().default(false),
    isBlocked: z.boolean().default(false),
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
