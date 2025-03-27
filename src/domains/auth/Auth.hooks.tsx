import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { useGlobal } from "@/domains/global";
import { FORM_FIELD_CONFIG, PATH } from "@/shared/constants";
import { useForm } from "@/shared/hooks/useForm";
import { getTranslation } from "@/shared/locale";
import { TQuerryError } from "@/shared/types";
import { removeLocalStorage, setLocalStorage } from "@/shared/utils";
import { useAuthContext } from "./Auth.context";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "./Auth.schema";
import { AuthService } from "./Auth.service";
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

const authService = new AuthService();

function useAuth() {
  const { authStore, setAuthStore } = useAuthContext();
  const { showToast, closeAllModals, closeAllSheets } = useGlobal();
  const navigate = useNavigate();

  const useForgotPassword = () => {
    return useMutation<IForgotPasswordResponse, TQuerryError, IForgotPasswordRequestData>({
      mutationFn: (data: IForgotPasswordRequestData) => authService.forgotPassword(data),
      onSuccess: res => {
        if (res?.data?.success) {
          showToast({
            type: "success",
            message: getTranslation({
              key: `messageCode.${res?.messageCode}`,
              defaultKey: "successful",
            }),
          });
        }
      },
    });
  };

  const useForgotPasswordForm = () => {
    const form = useForm({
      fields: [FORM_FIELD_CONFIG.email],
      schema: forgotPasswordSchema,
    });

    return {
      ...form,
    };
  };

  const useLogin = () => {
    return useMutation<ILoginResponse, TQuerryError, ILoginRequestData>({
      mutationFn: (data: ILoginRequestData) => authService.login(data),
      onSuccess: res => {
        const { accessToken, user } = res?.data || {};

        if (accessToken) {
          setLocalStorage("token", accessToken);
          navigate(PATH.licenses, { replace: true });

          if (user) {
            setLocalStorage("profile", _.omit(user, "id"));
          }

          showToast({
            type: "success",
            message: getTranslation({
              key: `messageCode.${res?.messageCode}`,
              defaultKey: "successful",
            }),
          });
        }
      },
    });
  };

  const useLoginForm = () => {
    const form = useForm({
      fields: [FORM_FIELD_CONFIG.email, FORM_FIELD_CONFIG.password],
      schema: loginSchema,
      initialValues: {
        email: authStore?.email || "",
      },
    });

    return {
      ...form,
    };
  };

  const useLogout = () => {
    return useMutation<ILogoutResponse, TQuerryError>({
      mutationFn: () => authService.logout(),
      onSuccess: res => {
        closeAllModals();
        closeAllSheets();
        removeLocalStorage("token");
        navigate("/login", { replace: true });

        showToast({
          type: "success",
          message: getTranslation({
            key: `messageCode.${res?.messageCode}`,
            defaultKey: "successful",
          }),
        });
      },
    });
  };

  const useRegister = () => {
    return useMutation<IRegisterResponse, TQuerryError, IRegisterRequestData>({
      mutationFn: (data: IRegisterRequestData) => authService.register(data),
      onSuccess: (res, req) => {
        if (res?.data?.success) {
          navigate("/login", { replace: true });

          setAuthStore?.({ email: req?.email });
          showToast({
            type: "success",
            message: getTranslation({
              key: `messageCode.${res?.messageCode}`,
              defaultKey: "successful",
            }),
          });
        }
      },
    });
  };

  const useRegisterForm = () => {
    const form = useForm({
      fields: [
        FORM_FIELD_CONFIG.email,
        FORM_FIELD_CONFIG.username,
        FORM_FIELD_CONFIG.department,
        FORM_FIELD_CONFIG.password,
        FORM_FIELD_CONFIG.confirmPassword,
      ],
      schema: registerSchema,
    });

    return form;
  };

  const useResetPassword = () => {
    return useMutation<IResetPasswordResponse, TQuerryError, IResetPasswordRequestData>({
      mutationFn: (data: IResetPasswordRequestData) => authService.resetPassword(data),
      onSuccess: res => {
        if (res?.data?.success) {
          navigate("/login", { replace: true });

          showToast({
            type: "success",
            message: getTranslation({
              key: `messageCode.${res?.messageCode}`,
              defaultKey: "successful",
            }),
          });
        }
      },
    });
  };

  const useResetPasswordForm = () => {
    const form = useForm({
      fields: [FORM_FIELD_CONFIG.password, FORM_FIELD_CONFIG.confirmPassword],
      schema: resetPasswordSchema,
    });

    return form;
  };

  return {
    useForgotPassword,
    useForgotPasswordForm,
    useLogin,
    useLoginForm,
    useLogout,
    useRegister,
    useRegisterForm,
    useResetPassword,
    useResetPasswordForm,
  };
}

export { useAuth };
