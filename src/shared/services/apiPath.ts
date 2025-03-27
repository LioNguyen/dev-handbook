import { PATH } from "@/shared/constants/common";

const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  if (!baseUrl) {
    throw new Error("VITE_BASE_API_URL is not defined in environment variables");
  }
  return baseUrl.replace(/\/$/, ""); // remove "/" at the end of url (if any)
};

const API_CONFIG = {
  BASE_URL: getBaseUrl(),
} as const;

const API_PATHS = {
  AUTH: {
    FORGOT_PASSWORD: `/auth${PATH.auth.forgotPassword}`,
    LOGIN: `/auth${PATH.auth.login}`,
    LOGOUT: `/auth${PATH.auth.logout}`,
    REGISTER: `/auth${PATH.auth.register}`,
    RESET_PASSWORD: `/auth${PATH.auth.resetPassword}`,
  },
  FIELDS: PATH.fields,
  PRODUCTS: PATH.products,
  LICENSES: PATH.licenses,
  USERS: PATH.users,
  SETTINGS: PATH.settings,
  AUDITS: PATH.audits,
} as const;

export { API_CONFIG, API_PATHS };
