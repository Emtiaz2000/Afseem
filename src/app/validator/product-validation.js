import {body} from 'express-validator'


export const productValidationForm = [
  body("productname")
    .notEmpty().withMessage("Product Name is required")
    .isLength({ min: 3 }).withMessage("Product Name must be at least 3 characters long")
    .isLength({ max: 100 }).withMessage("Product Name must not exceed 100 characters")
    .trim(),

  body("subcategory")
    .notEmpty().withMessage("Subcategory is required")
    .isIn([     "Giftshop",
                "Soups",
                "Salads",
                "Bread",
                "Main Courses",
                "Grilled/BBQ",
                "Pasta & Noodles",
                "Rice Dishes",
                "Burgers & Sandwiches",
                "Broasted",
                "Pizza & Flatbreads",
                "Seafood",
                "Meat & Poultry",
                "Vegetarian & Vegan",
                "Indian Dishes",
                "Middle Eastern Dishes",
                "Breakfast / Brunch",
                "Desserts",
                "Beverages",
                "Milkshakes & Specialty Drinks","Fruits & Vegetables",
                "Dairy & Eggs",
                "Meat & Poultry",
                "Fish & Seafood",
                "Grains & Breads",
                "Caned & Jarred Goods",
                "Frozen Foods",
                "Herbs & Spices",
                "Snacks & Chips",
                "Cookies and Biscuits",
                "Chocolates & Candies",
                "Nuts & Seeds",
                "Water & Beverages",
                "Bread & Baking Ingredients",
                "Noodles & Pasta",
                "Hygiene & Personal Care",
                "Organic Foods",
                "Household Supplies",
                "Health & Wellness",
                "Detergents & Cleaning Products",
                "Baby Care",
                "Pet Foods & Accessories",
                "Pulse, Rice & Cooking Oil",
                "Coffee & Tea",
                "Stationary",
                "Prepaid Cards",
                "International Specialty"])
    .withMessage("Please Select From the Option!")
    .trim(),

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
    .isLength({ min: 10,max:10 }).withMessage("SKU must be at least 10 characters long")
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



