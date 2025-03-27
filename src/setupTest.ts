/// <reference types="vitest/globals" />

import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("react-i18next", async () => ({
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
  useTranslation: () => ({
    t: vi.fn((key: string) => key),
    i18n: {
      changeLanguage: (lang: string) => new Promise(() => lang),
      language: "en",
    },
  }),
}));

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
