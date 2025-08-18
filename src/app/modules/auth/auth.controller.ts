import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user/user.constant';

const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  // console.log('userData', userData);
  const result = await AuthServices.registerUser(userData);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const registerUserAndShop = catchAsync(async (req: Request, res: Response) => {
  const userPayload = {
    ...req.body.user,
    role: USER_ROLE.seller,
  };
  const { user, shop, accessToken } = await AuthServices.registerUserWithShop(
    userPayload,
    req.body.shop,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User and Shop created successfully',
    data: { user, shop, accessToken },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthServices.loginUser(loginData);
  sendResponse(res, {
    success: true,
    message: 'Login Successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AuthControllers = {
  register,
  registerUserAndShop,
  login,
};
