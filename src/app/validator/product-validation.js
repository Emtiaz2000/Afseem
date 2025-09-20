import {body} from 'express-validator'


export const productValidationForm = [
  body("productname")
    .trim()
    .notEmpty().withMessage("Product Name is required")
    .isLength({ min: 3 }).withMessage("Product Name must be at least 3 characters long")
    .isLength({ max: 100 }).withMessage("Product Name must not exceed 100 characters")
    ,

  body("subcategory")
    .trim()
    .notEmpty().withMessage("Subcategory is required!")
    ,

  body("productimage")
    // If you are handling uploads, better check file in multer middleware instead of here.
    .optional()
    ,
  body("takephoto")
    // If you are handling uploads, better check file in multer middleware instead of here.
    .optional()
    ,
  body("sku")
    .notEmpty().withMessage("Product Price is required")
    .isLength({ min: 1 }).withMessage("SKU must be at least 1 characters long")
    .isInt({ gt: 0 }).withMessage("SKU must be an Integer!"),
  body("productprice")
    .notEmpty().withMessage("Product Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),

  body("productofferprice")
    .optional({ checkFalsy: true })
    .isFloat({ gt: 0 }).withMessage("Offer Price must be a number greater than 0")
    ,

  body("currency")
    .notEmpty().withMessage("Currency is required")
    .isIn(["BHD", "KD", "OR", "QR", "SR", "ED"])
    .withMessage("Currency must be selected from the given options"),
];

export const editproductValidationForm = [
  body("productname")
    .trim()
    .notEmpty().withMessage("Product Name is required")
    .isLength({ min: 3 }).withMessage("Product Name must be at least 3 characters long")
    .isLength({ max: 100 }).withMessage("Product Name must not exceed 100 characters")
    ,

  body("subcategory")
    .trim()
    .notEmpty().withMessage("Subcategory is required!")
    ,

  body("productimage")
    // If you are handling uploads, better check file in multer middleware instead of here.
    .optional()
    ,
  body("takephoto")
    // If you are handling uploads, better check file in multer middleware instead of here.
    .optional()
    ,
  body("sku")
    .notEmpty().withMessage("Product Price is required")
    .isLength({ min: 1 }).withMessage("SKU must be at least 1 characters long")
    .isInt({ gt: 0 }).withMessage("SKU must be an Integer!"),
  body("productprice")
    .notEmpty().withMessage("Product Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),

  body("productofferprice")
    .optional({ checkFalsy: true })
    .isFloat({ gt: 0 }).withMessage("Offer Price must be a number greater than 0")
    ,

  body("currency")
    .notEmpty().withMessage("Currency is required")
    .isIn(["BHD", "KD", "OR", "QR", "SR", "ED"])
    .withMessage("Currency must be selected from the given options"),
];

