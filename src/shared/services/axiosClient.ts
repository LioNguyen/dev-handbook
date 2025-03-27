import axios from "axios";

import { GlobalService, TOAST_TYPE } from "@/domains/global";
import { APP_EVENTS, TOAST_DURATION } from "@/shared/constants/common";
import { i18n } from "@/shared/locale";
import { API_CONFIG } from "@/shared/services/apiPath";
import { clearLocalStorage } from "@/shared/utils";

// Track which message codes have been displayed to avoid duplicate toasts
const displayedMessageCodes = new Set<string>();
// Debounce timer to reset the tracked messages
let resetDisplayedCodesTimer: NodeJS.Timeout | null = null;

const createAPIInstance = () =>
  axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
      "Content-type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false, // default
  });

/**
 * Shows a toast message for a given messageCode if it hasn't been shown recently
 * @param messageCode The error message code
 * @returns boolean indicating whether the toast was shown
 */
const handleErrorMessageCode = (messageCode: string): boolean => {
  // Only show toast if this message code hasn't been displayed yet
  if (!displayedMessageCodes.has(messageCode)) {
    displayedMessageCodes.add(messageCode);

    GlobalService.showToast({
      type: TOAST_TYPE.error,
      message: i18n.t(`messageCode.${messageCode}`, i18n.t("messageCode.UNKNOWN")),
      showIcon: false,
    });

    // Reset the displayed codes after a delay
    if (resetDisplayedCodesTimer) {
      clearTimeout(resetDisplayedCodesTimer);
    }

    resetDisplayedCodesTimer = setTimeout(() => {
      displayedMessageCodes.clear();
    }, TOAST_DURATION + 1500); // Reset after 3 seconds

    return true;
  }

  return false;
};

const getAuthApiInstance = () => {
  const apiInstance = createAPIInstance();

  // set interceptors requests
  apiInstance.interceptors.request.use(
    async config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      // Ensure the error is an instance of Error
      if (error instanceof Error) {
        return Promise.reject(error);
      } else {
        // If it's not an Error, create a new Error object
        return Promise.reject(new Error(error?.message || i18n.t("messageCode.UNKNOWN")));
      }
    },
  );

  // Add a response interceptor
  apiInstance.interceptors.response.use(
    response => response,
    async function (error) {
      const messageCode = error?.response?.data?.messageCode;
      if (messageCode) {
        // Handle INVALID_TOKEN specially - always perform logout actions
        if (messageCode === "INVALID_TOKEN") {
          GlobalService.closeAllModals();
          GlobalService.closeAllSheets();
          clearLocalStorage();
          window.dispatchEvent(new CustomEvent(APP_EVENTS.UNAUTHORIZED));
        }

        // Show toast for this message code if not already shown
        handleErrorMessageCode(messageCode);

        return Promise.reject(new Error(messageCode));
      }

      return Promise.reject(new Error(i18n.t("messageCode.UNKNOWN")));
    },
  );

  return apiInstance;
};

export { createAPIInstance, getAuthApiInstance };
