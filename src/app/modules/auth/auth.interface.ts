// import { UserType } from '../user/user.interface';

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface AuthenticatedUser {
  _id: string;
  name: string;
  email: string;
  // role: UserType;
  iat: number;
  exp: number;
}
