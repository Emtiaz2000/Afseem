import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    shop_id: z.string().min(1, 'Shop ID is required'),
    product_name: z.string().min(1, 'Product name is required'),
    category: z.string().min(1, 'Category is required'),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .nonnegative('Price must be greater than or equal to 0'),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, 'Quantity cannot be negative')
      .default(0),
    description: z.string().optional(),
    photo: z.string().min(1, 'Photo URL is required'),
  }),
});

const updateProductValidationShema = z.object({
  body: z.object({
    product_name: z.string().optional(),
    category: z.string().optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .nonnegative('Price must be greater than or equal to 0')
      .optional(),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, 'Quantity cannot be negative')
      .optional(),
    description: z.string().optional(),
    photo: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationShema,
};
