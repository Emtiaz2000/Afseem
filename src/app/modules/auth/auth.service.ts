import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import { Shop } from '../shop/shop.model';
import { IShop } from '../shop/shop.interface';
import mongoose from 'mongoose';

const registerUser = async (payload: IUser) => {
  if (await User.isEmailExist(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There is already a user registered with this email.',
    );
  }
  const result = await User.create(payload);

  const JwtPayload = {
    email: payload.email,
    role: result.role,
  };
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_token as string,
    Number(config.jwt_access_token_expires),
  );
  return { accessToken };
};

const registerUserWithShop = async (userPayload: IUser, shopPayload: IShop) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (await User.isEmailExist(userPayload.email)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
    }
    
    // 1. Check shop name already exist
    if (await Shop.isNameExist(shopPayload.shop_name)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Shop name already taken');
    }
    // 2. Create user (transaction-1)
    const newUser = await User.create([userPayload], { session });
    const user = newUser[0];

    // 3. Add owner_id to shop payload
    shopPayload.owner_id = new mongoose.Types.ObjectId(user._id);

    // 4. Create shop (transaction-3)
    const newShop = await Shop.create([shopPayload], { session });

    // 5. Update user to add shop_id (in the same transaction)
    await User.updateOne(
      { _id: user._id },
      { $set: { shop_id: newShop[0]._id } },
      { session },
    );

    // 6. Commit transaction
    await session.commitTransaction();
    await session.endSession();

    // 7. Generate token
    const JwtPayload = {
      email: user.email,
      role: user.role,
    };
    const accessToken = createToken(
      JwtPayload,
      config.jwt_access_token as string,
      Number(config.jwt_access_token_expires),
    );

    return { user, shop: newShop[0], accessToken };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `${error}`);
  }
};

const loginUser = async (payload: IUser) => {
  const user = await User.isEmailExist(payload.email);
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Enter your email and password correctly.',
    );
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are blocked!');
  }
  if (!user.isVerified) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please Verify Your Email!');
  }

  const isMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Enter your email and password correctly.',
    );
  }

  const JwtPayload = {
    email: payload.email,
    role: user.role,
  };
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_token as string,
    Number(config.jwt_access_token_expires),
  );

  return { accessToken };
};

export const AuthServices = {
  registerUser,
  registerUserWithShop,
  loginUser,
};
