import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: [true, "Product Name is required"],
      minlength: [3, "Product Name must be at least 3 characters long"],
      maxlength: [100, "Product Name must not exceed 100 characters"],
      trim: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // must match the model name of your Store schema
      required: true,
    },
    productorigin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // must match the model name of your Store schema
    },
    enable:{
      type:Boolean,
      default:true
    },
    disable:{
      type:Boolean,
    },
    category:{
      type: String,
      required:true,
    },

    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
      minlength: [3, "Subcategory must be at least 3 characters long"],
      maxlength: [50, "Subcategory must not exceed 50 characters"],
      trim: true,
    },

    productimage: {
      type: String,
      required:true
    },
    sku:{
      type: Number,
      required: [true, "SKU Number is required"],
    },
    productprice: {
      type: Number,
      required: [true, "Product Price is required"],
      min: [0, "Price must be greater than 0"],
    },

    productofferprice: {
      type: Number,
      validate: {
        validator: function (v) {
          // Offer price must be less than productprice if defined
          return v == null || v < this.productprice;
        },
        message: "Offer Price must be smaller than Regular Price",
      },
    },

    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: {
        values: ["BHD", "KD", "OR", "QR", "SR", "ED"],
        message: "Currency must be one of: BHD, KD, OR, QR, SR, ED",
      },
    },

  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
