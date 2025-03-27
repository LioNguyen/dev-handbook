import _ from "lodash";

import { API_PATHS, getAuthApiInstance } from "@/shared/services";
import {
  IActiveUserResponse,
  ICreateUserRequestData,
  ICreateUserResponse,
  IDeactiveUserResponse,
  IDeleteUserBulkRequestData,
  IDeleteUserBulkResponse,
  IDeleteUserResponse,
  IGetUserAllParams,
  IGetUserAllResponse,
  IGetUserProfileResponse,
  IGetUserRequestData,
  IGetUserResponse,
  IGetUserRoleAllParams,
  IGetUserRoleAllResponse,
  IUpdateUserProfileRequestData,
  IUpdateUserProfileResponse,
  IUpdateUserRequestData,
  IUpdateUserResponse,
} from "./User.types";

const axios = getAuthApiInstance();
const BASE_URL = API_PATHS.USERS;

class UserService {
  // Get profile
  public async getUserProfile(): Promise<IGetUserProfileResponse> {
    const res = await axios.get<IGetUserProfileResponse>(`${BASE_URL}/profile`);

    return res?.data;
  }

  // Update profile
  public async updateUserProfile(data: IUpdateUserProfileRequestData): Promise<IUpdateUserProfileResponse> {
    const res = await axios.put<IUpdateUserProfileResponse>(`${BASE_URL}/profile`, data);

    return res?.data;
  }

  // Get user role all
  public async getUserRoleAll(params: IGetUserRoleAllParams): Promise<IGetUserRoleAllResponse> {
    const res = await axios.get<IGetUserRoleAllResponse>(`${BASE_URL}/roles`, { params });

    return res?.data;
  }

  // Get all
  public async getUserAll(params: IGetUserAllParams): Promise<IGetUserAllResponse> {
    const res = await axios.get<IGetUserAllResponse>(`${BASE_URL}`, {
      params,
    });

    return res?.data;
  }

  // Get
  public async getUser(data: IGetUserRequestData): Promise<IGetUserResponse> {
    const res = await axios.get<IGetUserResponse>(`${BASE_URL}/${data.id}`);

    return res?.data;
  }

  // Create
  public async createUser(data: ICreateUserRequestData): Promise<ICreateUserResponse> {
    const res = await axios.post<ICreateUserResponse>(`${BASE_URL}`, data);

    return res?.data;
  }

  // Update
  public async updateUser(data: IUpdateUserRequestData): Promise<IUpdateUserResponse> {
    const res = await axios.put<IUpdateUserResponse>(`${BASE_URL}/${data.id}`, _.omit(data, ["id"]));

    return res?.data;
  }

  // Active
  public async activeUser(id: number): Promise<IActiveUserResponse> {
    const res = await axios.put<IActiveUserResponse>(`${BASE_URL}/${id}/active`);

    return res?.data;
  }

  // Deactive
  public async deactiveUser(id: number): Promise<IDeactiveUserResponse> {
    const res = await axios.put<IDeactiveUserResponse>(`${BASE_URL}/${id}/deactive`);

    return res?.data;
  }

  // Delete
  public async deleteUser(id: number): Promise<IDeleteUserResponse> {
    const res = await axios.delete(`${BASE_URL}/${id}`);

    return res?.data;
  }

  // Delete bulk
  public async deleteUserBulk(data: IDeleteUserBulkRequestData): Promise<IDeleteUserBulkResponse> {
    const res = await axios.delete(`${BASE_URL}`, { data });

    return res?.data;
  }
}

export { UserService };
