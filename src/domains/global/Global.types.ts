const TOAST_TYPE = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
} as const;

type TToastTypeValue = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

interface IShowToastParams {
  type: TToastTypeValue;
  message: string;
  duration?: number;
  showIcon?: boolean;
}

interface IToastMessage extends IShowToastParams {
  id: string;
}

// START: Modal config
const MODAL_NAME = {
  closeSheetConfirm: "closeSheetConfirm",
  fieldDeleteConfirm: "fieldDeleteConfirm",
  licenseDeleteConfirm: "licenseDeleteConfirm",
  productDeleteConfirm: "productDeleteConfirm",
  userDeleteConfirm: "userDeleteConfirm",
} as const;

interface IOpenModalParams extends IModalConfig {
  name: (typeof MODAL_NAME)[keyof typeof MODAL_NAME];
}

interface IModalConfig {
  data?: any;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

interface IModalInstance extends IModalConfig {
  isOpen: boolean;
}

type TModalMap = Record<string, IModalInstance>;
// END: Modal config

// START: Sheet config
const SHEET_NAME = {
  fieldForm: "fieldForm",
  productForm: "productForm",
  licenseDetail: "licenseDetail",
  licenseForm: "licenseForm",
  userAccountUpdate: "userAccountUpdate",
  userForm: "userForm",
  userReview: "userReview",
  settingForm: "settingForm",
} as const;

interface IOpenSheetParams extends ISheetConfig {
  name: (typeof SHEET_NAME)[keyof typeof SHEET_NAME];
}

interface ISheetConfig {
  data?: {
    id?: number;
    item?: any;
    onSuccess?: (params?: any) => void;
    onClose?: (params?: any) => void;
  };
  side?: "left" | "right";
}

interface ISheetInstance extends ISheetConfig {
  isOpen: boolean;
  order: number; // to track sheets order
}

type TSheetMap = Record<string, ISheetInstance>;
// END: Sheet config

interface IGlobalStore {
  toasts: IToastMessage[];
  isLoading: boolean;
  modals: {
    instances: TModalMap;
    activeModals: string[]; // array of modal names
  };
  sheets: {
    instances: TSheetMap;
    activeSheets: string[]; // array of sheet names in order
  };
}

interface IGlobalActions {
  showToast: (params: IShowToastParams) => void;
  closeToast: (id: string) => void;
  showLoader: () => void;
  hideLoader: () => void;
  // Modal actions
  openModal: (params: IOpenModalParams) => void;
  closeModal: (name: string) => void;
  closeAllModals: () => void;
  // Sheet actions
  openSheet: (params: IOpenSheetParams) => void;
  closeSheet: (name: string) => void;
  closeAllSheets: () => void;
}

type TGlobalContextValue = IGlobalStore & IGlobalActions;

export { MODAL_NAME, SHEET_NAME, TOAST_TYPE };

export type {
  IGlobalActions,
  IGlobalStore,
  // Modal
  IModalConfig,
  IModalInstance,
  IOpenModalParams,

  // Sheet
  ISheetConfig,
  ISheetInstance,
  IOpenSheetParams,

  // Others
  IShowToastParams,
  IToastMessage,
  TGlobalContextValue,
  TModalMap,
  TSheetMap,
  TToastTypeValue,
};
