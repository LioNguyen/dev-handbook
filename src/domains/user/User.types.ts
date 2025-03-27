import { z } from "zod";

import { ISearchConfig, ISortConfig } from "@/shared/hooks/useTable";
import { IApiResponse, IPagination, IPaginationFilter } from "@/shared/types";
import { createUserSchema, updateUserProfileSchema, updateUserSchema, userBaseSchema } from "./User.schema";

type IUserBase = z.infer<typeof userBaseSchema>;
type ICreateUserForm = z.infer<typeof createUserSchema>;
type IUpdateUserForm = z.infer<typeof updateUserSchema>;
type IUpdateUserProfileForm = z.infer<typeof updateUserProfileSchema>;

// User context type
interface IUserContext {
  userProfileStore?: IUserItem | null;
  setUserProfileStore?: (userProfile: IUserItem) => void;
  removeUserProfileStore?: () => void;
}

// Base item interface
interface IUserItem extends IUserBase {}

interface IUserData {
  item: IUserItem;
}

// Create
interface ICreateUserRequestData {}

interface ICreateUserResponse extends IApiResponse {
  data: IUserData;
}

// Get user role all
interface IGetUserRoleAllData extends IPagination {
  items: string[];
}

interface IGetUserRoleAllParams extends IPaginationFilter {
  search: ISearchConfig[];
}

interface IGetUserRoleAllResponse extends IApiResponse {
  data: IGetUserRoleAllData;
}

// Get
interface IGetUserRequestData {
  id: number;
}

interface IGetUserResponse extends IApiResponse {
  data: IUserData;
}

// Get all
interface IGetUserAllData extends IPagination {
  items: IUserItem[];
}

interface IGetUserAllParams extends IPaginationFilter {
  filters?: Record<string, string>;
  search: ISearchConfig[];
  sort: ISortConfig[];
}

interface IGetUserAllResponse extends IApiResponse {
  data: IGetUserAllData;
}

// Update
interface IUpdateUserRequestData extends ICreateUserRequestData {
  id: number;
}

interface IUpdateUserResponse extends IApiResponse {
  data: IUserData;
}

// Active Deactive
interface IActiveUserResponse extends IApiResponse {
  data: {
    success: boolean;
  };
}

interface IDeactiveUserResponse extends IApiResponse {
  data: {
    success: boolean;
  };
}

// Delete
interface IDeleteUserResponse extends IApiResponse {
  data: {
    item: Pick<IUserItem, "id">;
  };
}

interface IDeleteUserBulkRequestData {
  ids: number[];
}

interface IDeleteUserBulkResponse extends IApiResponse {
  data: {
    items: { id: number }[];
  };
}

// Get profile
interface IGetUserProfileResponse extends IApiResponse {
  data: IUserItem;
}

// Update profile
interface IUpdateUserProfileRequestData extends IUpdateUserProfileForm {}

interface IUpdateUserProfileResponse extends IApiResponse {
  data: IUserData;
}

export type {
  IActiveUserResponse,
  ICreateUserForm,
  ICreateUserRequestData,
  ICreateUserResponse,
  IDeactiveUserResponse,
  IDeleteUserBulkRequestData,
  IDeleteUserBulkResponse,
  IDeleteUserResponse,
  IGetUserAllData,
  IGetUserAllParams,
  IGetUserAllResponse,
  IGetUserProfileResponse,
  IGetUserRequestData,
  IGetUserResponse,
  IGetUserRoleAllData,
  IGetUserRoleAllParams,
  IGetUserRoleAllResponse,
  IUpdateUserForm,
  IUpdateUserProfileRequestData,
  IUpdateUserProfileResponse,
  IUpdateUserRequestData,
  IUpdateUserResponse,
  IUserContext,
  IUserItem,
};
