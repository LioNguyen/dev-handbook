import { z } from "zod";

import { IApiResponse } from "@/shared/types";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "./Auth.schema";

interface IAuthContext {
  authStore?: any;
  setAuthStore?: (auth: any) => void;
  removeAuthStore?: () => void;
}

interface IForgotPasswordRequestData {
  email: string;
}

interface IForgotPasswordResponse extends IApiResponse {
  data: {
    success: boolean;
  };
}

interface ILoginRequestData {
  email: string;
  password: string;
}

interface ILoginResponse extends IApiResponse {
  data: {
    accessToken: string;
    user: any;
  };
}

interface ILogoutResponse extends IApiResponse {
  data: {
    success: boolean;
  };
}

interface IRegisterRequestData {
  email: string;
  department: string;
  username: string;
  password: string;
}

interface IRegisterResponse extends IApiResponse {
  data: {
    success: boolean;
  };
}

interface IResetPasswordRequestData {
  password: string;
  token: string;
}

interface IResetPasswordResponse extends IApiResponse {
  data: {
    success: boolean;
  };
}

type IForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
type ILoginForm = z.infer<typeof loginSchema>;
type IRegisterForm = z.infer<typeof registerSchema>;
type IResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export type {
  IAuthContext,
  IForgotPasswordForm,
  IForgotPasswordRequestData,
  IForgotPasswordResponse,
  ILoginForm,
  ILoginRequestData,
  ILoginResponse,
  ILogoutResponse,
  IRegisterForm,
  IRegisterRequestData,
  IRegisterResponse,
  IResetPasswordForm,
  IResetPasswordRequestData,
  IResetPasswordResponse,
};
