// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("react-i18next", async () => ({
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: (lang: string) => new Promise(() => lang),
      language: "en",
    },
  }),
}));

vi.mock("@/shared/locale", () => ({
  i18n: {
    t: vi.fn((key: string) => key),
  },
  getTranslation: vi.fn(({ key }) => key),
}));

// Mock constant
vi.mock("@/shared/constants/router", () => ({
  PATH: {
    auth: {
      forgotPassword: "/forgot-password",
      login: "/login",
      logout: "/logout",
      register: "/register",
      resetPassword: "/reset-password",
    },
    fields: "/fields",
    products: "/products",
    licenses: "/licenses",
    users: "/users",
    settings: "/settings",
  },
  NAV_ITEMS: [
    { title: "fields", url: "/fields", icon: "ICON.fields" },
    { title: "products", url: "/products", icon: "ICON.products" },
    { title: "licenses", url: "/licenses", icon: "ICON.licenses" },
    { title: "users", url: "/users", icon: "ICON.users" },
    { title: "settings", url: "/settings", icon: "ICON.settings" },
  ],
}));

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
