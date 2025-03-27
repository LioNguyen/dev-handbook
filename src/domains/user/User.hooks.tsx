import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { IFormTypeProps } from "@/components/form";
import { MODAL_NAME, TOAST_TYPE, TToastTypeValue, useGlobal } from "@/domains/global";
import { FORM_FIELD, PAGE, ROLE } from "@/shared/constants";
import { useForm } from "@/shared/hooks/useForm";
import { useInfiniteOptions, usePagination } from "@/shared/hooks/useLoadMore";
import { useTable } from "@/shared/hooks/useTable";
import { getLocalStorage, getUserFormFields, IGetUserFormFields } from "@/shared/utils";
import { UserService } from "./User.service";
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
  IUserItem,
} from "./User.types";

interface IUseUserFormProps<T extends z.ZodSchema> extends IGetUserFormFields {
  userRoleSelectData?: IFormTypeProps["select"];
  schema?: T;
  initialValues?: Partial<z.infer<T>>;
}

// Create instance for UserApi
const userApi = new UserService();

function useUser() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal, showToast } = useGlobal();

  const handleToast = (messageCode?: string, type: TToastTypeValue = "success") => {
    switch (type) {
      case TOAST_TYPE.success:
        showToast({
          type: "success",
          message: t(`messageCode.${messageCode}`, { ns: "user", defaultValue: t("successful") }),
        });
        break;

      default:
        break;
    }
  };

  // Hook to get all user roles
  const useGetUserRoleAll = (params: IGetUserRoleAllParams) => {
    return useQuery<IGetUserRoleAllResponse, Error>({
      queryKey: ["userRoles", params],
      queryFn: () => userApi.getUserRoleAll(params),
    });
  };

  // Hook to get user profile
  const useGetUserPermissions = () => {
    const userRole = (getLocalStorage("profile") as IUserItem)?.role;

    let accessibleRoutes: string[] = [];
    if (userRole) {
      if (userRole === ROLE.admin) {
        accessibleRoutes = [PAGE.fields, PAGE.products, PAGE.licenses, PAGE.users, PAGE.audits, PAGE.settings];
      }

      if (userRole === ROLE.manager) {
        accessibleRoutes = [PAGE.fields, PAGE.products, PAGE.licenses];
      }

      if (userRole === ROLE.user) {
        accessibleRoutes = [PAGE.licenses];
      }
    }

    return {
      accessibleRoutes,
    };
  };

  // Hook to get user profile
  const useGetUserProfile = () => {
    return useQuery<IGetUserProfileResponse, Error>({
      queryKey: ["userProfile"],
      queryFn: () => userApi.getUserProfile(),
    });
  };

  // Hook to update user
  const useUpdateUserProfile = () => {
    return useMutation<IUpdateUserProfileResponse, Error, IUpdateUserProfileRequestData>({
      mutationFn: (data: IUpdateUserProfileRequestData) => userApi.updateUserProfile(data),
      onSuccess: res => {
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["userProfile"],
        });
      },
    });
  };

  // Hook to get all users
  const useGetUserAll = (params: IGetUserAllParams) => {
    return useQuery<IGetUserAllResponse, Error>({
      queryKey: ["users", params],
      queryFn: () => userApi.getUserAll(params),
    });
  };

  // Hook to get user
  const useGetUser = () => {
    return useMutation<IGetUserResponse, Error, IGetUserRequestData>({
      mutationFn: (data: IGetUserRequestData) => userApi.getUser(data),
    });
  };

  // Hook to create user
  const useCreateUser = () => {
    return useMutation<ICreateUserResponse, Error, ICreateUserRequestData>({
      mutationFn: (data: ICreateUserRequestData) => userApi.createUser(data),
      onSuccess: res => {
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });
  };

  // Hook to update user
  const useUpdateUser = () => {
    return useMutation<IUpdateUserResponse, Error, IUpdateUserRequestData>({
      mutationFn: (data: IUpdateUserRequestData) => userApi.updateUser(data),
      onSuccess: res => {
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });
  };

  // Hook to active license
  const useActiveUser = () => {
    return useMutation<IActiveUserResponse, Error, number>({
      mutationFn: (userId: number) => userApi.activeUser(userId),
      onSuccess: res => {
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });
  };

  // Hook to deactive license
  const useDeactiveUser = () => {
    return useMutation<IDeactiveUserResponse, Error, number>({
      mutationFn: (userId: number) => userApi.deactiveUser(userId),
      onSuccess: res => {
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });
  };

  // Hook to delete user
  const useDeleteUser = () => {
    return useMutation<IDeleteUserResponse, Error, number>({
      mutationFn: (deletedId: number) => userApi.deleteUser(deletedId),
      onSuccess: (res, deletedId) => {
        closeModal(MODAL_NAME.userDeleteConfirm);
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.removeQueries({
          queryKey: ["user", deletedId],
        });
      },
    });
  };

  // Hook to delete user in bulk
  const useDeleteUserBulk = () => {
    return useMutation<IDeleteUserBulkResponse, Error, IDeleteUserBulkRequestData>({
      mutationFn: (data: IDeleteUserBulkRequestData) => userApi.deleteUserBulk(data),
      onSuccess: (res, data) => {
        closeModal(MODAL_NAME.userDeleteConfirm);
        handleToast(res?.messageCode);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        data.ids.forEach(deletedId => {
          queryClient.removeQueries({
            queryKey: ["user", deletedId],
          });
        });
      },
    });
  };

  // Hook to get user options
  const useUserRoleOptions = ({ initialParams }: { initialParams?: Partial<IGetUserRoleAllParams> }) => {
    const userRoleTable = useTable<IGetUserRoleAllParams>({
      initialParams: {
        page: 1,
        limit: 10,
        search: [],
        ...initialParams,
      },
    });

    const userRoleData = useGetUserRoleAll(userRoleTable.queryParams);

    const userRolePaginationData = usePagination({
      data: userRoleData.data,
      isLoading: userRoleData.isLoading,
      queryParams: userRoleTable.queryParams,
      onQueryChange: userRoleTable.handleQueryChange,
    });

    const infiniteOptions = useInfiniteOptions({
      getOptionLabel: item => t(`role.${item}`, { ns: "user" }),
      getOptionValue: item => item,
      data: {
        items: [...(userRoleData?.data?.data?.items || [])],
      },
    });

    return {
      ...userRoleData,
      ...userRoleTable,
      ...userRolePaginationData,
      infiniteOptions,
    };
  };

  // Hook to create user form
  const useUserForm = <T extends z.ZodSchema>({
    mode,
    disabledFields,
    readOnlyFields,
    schema,
    initialValues,
    userRoleSelectData,
  }: IUseUserFormProps<T>) => {
    const initialFormFields = getUserFormFields({ mode, disabledFields, readOnlyFields }).map(field => {
      if (field.name === FORM_FIELD.userRole.name) {
        return {
          ...field,
          data: {
            ...field.data,
            ...userRoleSelectData,
          },
        };
      }
      return field;
    });

    const form = useForm({
      fields: initialFormFields,
      schema,
      initialValues,
    });

    return form;
  };

  // Hook to get user table data
  const useUserTable = ({ initialParams }: { initialParams?: Partial<IGetUserAllParams> }) => {
    const userTable = useTable<IGetUserAllParams>({
      initialParams: {
        page: 1,
        limit: 10,
        search: [],
        sort: [],
        ...initialParams,
      },
    });
    const userData = useGetUserAll(userTable.queryParams);

    return {
      ...userData,
      ...userTable,
    };
  };

  return {
    useActiveUser,
    useDeactiveUser,
    useCreateUser,
    useDeleteUser,
    useDeleteUserBulk,
    useUserForm,
    useGetUser,
    useGetUserAll,
    useGetUserPermissions,
    useGetUserProfile,
    useUpdateUser,
    useUpdateUserProfile,
    useUserRoleOptions,
    useUserTable,
  };
}

export { useUser };
