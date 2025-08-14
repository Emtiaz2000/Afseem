import { z } from 'zod';

const createShopValidationSchema = z.object({
  body: z.object({
    owner_id: z
      .string({ required_error: 'Owner ID is required' })
      .refine((val) => val.trim().length > 0, {
        message: 'Owner ID cannot be empty',
      }),

    shop_name: z
      .string({ required_error: 'Shop name is required' })
      .trim()
      .min(2, 'Shop name must be at least 2 characters')
      .max(100, 'Shop name must not exceed 100 characters'),

    description: z
      .string({ required_error: 'Description is required' })
      .max(500, 'Description must not exceed 500 characters')
      .optional(),

    logo_url: z.string().url('Logo URL must be valid').nullable().optional(),

    banner_url: z
      .string({ required_error: 'Banner URL is required' })
      .url('Banner URL must be valid'),

    isVerified: z.boolean().optional(),

    business_type: z.string({ required_error: 'Business type is required' }),

    shop_address: z.object({
      locationMap: z.string().optional(),
      street: z
        .string({ required_error: 'Street is required' })
        .trim()
        .min(1, 'Street cannot be empty'),
      zip: z
        .string({ required_error: 'ZIP code is required' })
        .trim()
        .min(1, 'ZIP cannot be empty'),
      city: z
        .string({ required_error: 'City is required' })
        .trim()
        .min(1, 'City cannot be empty'),
      state: z
        .string({ required_error: 'State is required' })
        .trim()
        .min(1, 'State cannot be empty'),
      country: z
        .string({ required_error: 'Country is required' })
        .trim()
        .min(1, 'Country cannot be empty'),
    }),

    working_hours: z.object({
      open: z.string({ required_error: 'Shop Opening time is required ' }),
      close: z.string({ required_error: 'Shop Closing time is required' }),
    }),

    delivery_available: z.boolean({
      required_error: 'Delivery availability is required',
    }),

    deletedAt: z.string().datetime().optional(),
  }),
});

const updateShopValidationSchema = z.object({
  body: z.object({
    shop_name: z
      .string()
      .min(2, 'Shop name must be at least 2 characters')
      .max(100, 'Shop name must not exceed 100 characters')
      .optional(),

    description: z
      .string()
      .max(500, 'Description must not exceed 500 characters')
      .optional(),

    logo_url: z.string().url('Logo URL must be valid').nullable().optional(),

    banner_url: z.string().url('Banner URL must be valid').optional(),

    isVerified: z.boolean().optional(),

    business_type: z.string().optional(),

    shop_address: z
      .object({
        locationMap: z.string().optional(),
        street: z.string().optional(),
        zip: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
      })
      .optional(),

    working_hours: z
      .object({
        open: z.string().optional(),
        close: z.string().optional(),
      })
      .optional(),

    delivery_available: z.boolean().optional(),

    deletedAt: z.string().datetime().optional(),
  }),
});

export const ShopValidation = {
  createShopValidationSchema,
  updateShopValidationSchema,
};
