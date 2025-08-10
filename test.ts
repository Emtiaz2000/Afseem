import { Schema, Types } from 'mongoose';
import {
  IUser,
  UserModel,
  UserType,
} from './src/app/modules/user/user.interface';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    image_url: {
      type: String,
      default: '',
    },
    ws_number: {
      type: String,
      default: '',
    },
    person_address: {
      type: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, default: '' },
        locationMap: { type: String, default: '' },
      },
      default: {},
    },
    role: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.buyer,
    },
    shop: {
      type: Types.ObjectId,
      ref: 'Shop',
      default: null, // Only populated for sellers
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
