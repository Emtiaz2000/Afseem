import { model, Schema, Types } from 'mongoose';
import { IUser, UserModel, UserType } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    role: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.buyer,
    },
    shop: {
      type: Types.ObjectId,
      ref: 'Shop',
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      default: '',
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
    ws_number: {
      type: String,
      required: true,
      default: '',
    },
    person_address: {
      type: {
        locationMap: { type: String, default: '' },
        address: { type: String, default: '' },
        street: { type: String, default: '' },
        zip: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        country: { type: String, default: '' },
      },
      default: {},
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

// middlewire
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// static method
UserSchema.statics.isEmailExist = async function (email) {
  return await this.findOne({ email }).select('+password'); // for send password through api
};
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', UserSchema);
