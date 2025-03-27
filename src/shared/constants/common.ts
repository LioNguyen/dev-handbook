// ========== External Dependencies ==========
import { FileKey2, History, NotepadText, Package, Settings, UsersRound } from "lucide-react";

// ========== Asset Imports ==========
import bell from "@/shared/assets/bell.svg";
import forms from "@/shared/assets/forms.svg";
import logoDark from "@/shared/assets/logo-dark.svg";
import logoLight from "@/shared/assets/logo-light.svg";
import logoNameDark from "@/shared/assets/logo-name-dark.svg";
import logout from "@/shared/assets/logout.svg";
import moon from "@/shared/assets/moon.svg";
import profile from "@/shared/assets/profile.svg";

// ========== Internal Dependencies ==========
import { i18n } from "@/shared/locale";

// =============================================================================
// APPLICATION CORE
// Core application settings, events, and system-wide configurations
// =============================================================================

/**
 * Global application events
 */
const APP_EVENTS = {
  UNAUTHORIZED: "app:unauthorized",
} as const;

/**
 * Application-wide error codes
 */
const ERROR = {
  FORBIDDEN: "FORBIDDEN",
} as const;

/**
 * Toast notification duration in milliseconds
 */
const TOAST_DURATION = 1500;

// =============================================================================
// AUTHENTICATION & AUTHORIZATION
// User roles, permissions, and auth-related constants
// =============================================================================

/**
 * User role definitions
 */
const ROLE = {
  admin: "admin",
  manager: "manager",
  user: "user",
} as const;

// =============================================================================
// NAVIGATION & ROUTING
// Route definitions, paths, and page configurations
// =============================================================================

/**
 * Page identifiers used throughout the application
 */
const PAGE = {
  fields: "fields",
  products: "products",
  licenses: "licenses",
  users: "users",
  settings: "settings",
  audits: "audits",
} as const;

/**
 * Application routes and paths
 */
const PATH = {
  auth: {
    forgotPassword: "/forgot-password",
    login: "/login",
    logout: "/logout",
    register: "/register",
    resetPassword: "/reset-password",
  },
  fields: `/${PAGE.fields}`,
  products: `/${PAGE.products}`,
  licenses: `/${PAGE.licenses}`,
  licensesDetail: `/${PAGE.licenses}/:id`,
  users: `/${PAGE.users}`,
  usersReview: `/${PAGE.users}/:id/review`,
  settings: `/${PAGE.settings}`,
  audits: `/${PAGE.audits}`,
} as const;

// =============================================================================
// UI CONFIGURATION
// UI-related constants, layout settings, and display options
// =============================================================================

/**
 * Element alignment options
 */
const ALIGN = {
  center: "center",
  end: "end",
  start: "start",
} as const;

/**
 * Positioning options for UI elements
 */
const SIDE = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
} as const;

/**
 * Responsive design breakpoints
 */
const SCREEN_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

/**
 * @deprecated Use SCREEN_BREAKPOINTS.TABLET instead
 */
const MOBILE_BREAKPOINT = 1024;

/**
 * Offset for sheet/dialog components
 */
const SHEET_OFFSET = 32;

/**
 * Available page sizes for tables
 */
const PAGE_SIZE = [5, 10, 20, 30, 40, 50] as const;

// =============================================================================
// ICONS & ASSETS
// Icon mappings and asset configurations
// =============================================================================

/**
 * Application-wide icon mapping
 */
const ICON = {
  // Static SVG assets
  bell,
  forms,
  logoDark,
  logoLight,
  logoNameDark,
  logout,
  moon,
  profile,

  // Lucide icons
  audits: History,
  licenses: FileKey2,
  fields: NotepadText,
  products: Package,
  users: UsersRound,
  settings: Settings,
} as const;

// =============================================================================
// FORM & DATA
// Form configurations, data formatting, and input options
// =============================================================================

/**
 * Valid tokens for datetime formatting
 */
const DATETIME_VALID_TOKENS = ["yyyy", "mm", "dd", "HH", "MM", "ss"] as const;

/**
 * Date picker period options
 */
const DATE_PICKER_OPTIONS = [
  { label: i18n.t("form.date_picker_option_3_months"), value: "90" },
  { label: i18n.t("form.date_picker_option_6_months"), value: "180" },
  { label: i18n.t("form.date_picker_option_9_months"), value: "270" },
  { label: i18n.t("form.date_picker_option_1_year"), value: "365" },
  { label: i18n.t("form.date_picker_option_2_years"), value: "730" },
  { label: i18n.t("form.date_picker_option_3_years"), value: "1095" },
] as const;

/**
 * Time period options for reports
 */
const PERIOD_OPTIONS = [
  { label: i18n.t("Day"), value: "day" },
  { label: i18n.t("Month"), value: "month" },
];

/**
 * Status options for entities
 */
const STATUS_OPTIONS = [
  { label: i18n.t("status.active"), value: "active" },
  { label: i18n.t("status.inactive"), value: "inactive" },
];

/**
 * Storage unit options
 */
const UNIT_OPTIONS = [
  { label: "GB", value: "GB" },
  { label: "TB", value: "TB" },
];

// =============================================================================
// EXPORTS
// Grouped exports by category
// =============================================================================

export {
  // UI Configuration
  ALIGN,
  // Application Core
  APP_EVENTS,
  DATE_PICKER_OPTIONS,
  // Form & Data
  DATETIME_VALID_TOKENS,
  ERROR,
  // Icons & Assets
  ICON,
  MOBILE_BREAKPOINT,
  // Navigation & Routing
  PAGE,
  PAGE_SIZE,
  PATH,
  PERIOD_OPTIONS,
  // Authentication & Authorization
  ROLE,
  SCREEN_BREAKPOINTS,
  SHEET_OFFSET,
  SIDE,
  STATUS_OPTIONS,
  TOAST_DURATION,
  UNIT_OPTIONS,
};
