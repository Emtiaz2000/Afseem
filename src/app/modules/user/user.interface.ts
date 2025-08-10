import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export enum UserType {
  buyer = 'buyer',
  seller = 'seller',
  admin = 'admin',
}

export interface IUser {
  _id: string;
  role: UserType;
  shop?: Types.ObjectId;
  name: string;
  image_url?: string;
  email: string;
  password: string;
  ws_number: string;
  person_address: {
    locationMap?: string;
    address: string;
    street: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  };
  isVerified: boolean;
  isBlocked: boolean;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isEmailExist(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
