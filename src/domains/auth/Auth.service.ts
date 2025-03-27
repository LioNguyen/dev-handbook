import { API_PATHS, getAuthApiInstance } from "@/shared/services";
import {
  IForgotPasswordRequestData,
  IForgotPasswordResponse,
  ILoginRequestData,
  ILoginResponse,
  ILogoutResponse,
  IRegisterRequestData,
  IRegisterResponse,
  IResetPasswordRequestData,
  IResetPasswordResponse,
} from "./Auth.types";

const axios = getAuthApiInstance();
const BASE_URL = API_PATHS.AUTH;

class AuthService {
  public async forgotPassword(data: IForgotPasswordRequestData): Promise<IForgotPasswordResponse> {
    const res = await axios.post<IForgotPasswordResponse>(BASE_URL.FORGOT_PASSWORD, data);

    return res?.data;
  }

  public async login(data: ILoginRequestData): Promise<ILoginResponse> {
    const res = await axios.post<ILoginResponse>(BASE_URL.LOGIN, data);

    return res?.data;
  }

  public async logout(): Promise<ILogoutResponse> {
    const res = await axios.post<ILogoutResponse>(BASE_URL.LOGOUT);

    return res?.data;
  }

  public async register(data: IRegisterRequestData): Promise<IRegisterResponse> {
    const res = await axios.post<IRegisterResponse>(BASE_URL.REGISTER, data);

    return res?.data;
  }

  public async resetPassword(data: IResetPasswordRequestData): Promise<IResetPasswordResponse> {
    const res = await axios.post<IResetPasswordResponse>(BASE_URL.RESET_PASSWORD, data);

    return res?.data;
  }
}

export { AuthService };
