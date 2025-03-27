import _ from "lodash";

import { FORM_TYPES, IFormField, IFormType } from "@/components/form/FormGroup";
import { i18n } from "@/shared/locale";
import { STATUS_OPTIONS } from "./common";

interface IGetLicenseFormFields {
  readOnly?: boolean;
}

const FORM_MODE = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  USER_ACCOUNT_UPDATE: "USER_ACCOUNT_UPDATE",
  VIEW: "VIEW",
};

const FORM_FIELD = {
  // Auth Form Fields
  email: {
    key: "email",
    name: "email",
  },
  username: {
    key: "username",
    name: "username",
  },
  department: {
    key: "department",
    name: "department",
  },
  password: {
    key: "password",
    name: "password",
  },
  confirmPassword: {
    key: "confirmPassword",
    name: "confirmPassword",
  },

  // Field Form Fields
  fieldName: {
    key: "fieldName",
    name: "name",
  },
  fieldType: {
    key: "fieldType",
    name: "type",
  },
  fieldVariable: {
    key: "fieldVariable",
    name: "variable",
  },
  fieldRequired: {
    key: "fieldRequired",
    name: "required",
  },

  // Product Form Fields
  productKey: {
    key: "productKey",
    name: "key",
  },
  productName: {
    key: "productName",
    name: "name",
  },
  productFields: {
    key: "productFields",
    name: "fields",
  },

  // License Form Fields
  licenseKey: {
    key: "licenseKey",
    name: "key",
  },
  licenseProductId: {
    key: "licenseProductId",
    name: "product_id",
  },
  licenseCreatorUsername: {
    key: "licenseCreatorUsername",
    name: "creator_username",
  },
  licenseCustomer: {
    key: "licenseCustomer",
    name: "customer",
  },
  licenseDescription: {
    key: "licenseDescription",
    name: "description",
  },

  // User Form Fields
  userEmail: {
    key: "userEmail",
    name: "email",
  },
  userUserName: {
    key: "userUserName",
    name: "username",
  },
  userCurrentPassword: {
    key: "userCurrentPassword",
    name: "currentPassword",
  },
  userPassword: {
    key: "userPassword",
    name: "password",
  },
  userConfirmPassword: {
    key: "userConfirmPassword",
    name: "confirmPassword",
  },
  userRole: {
    key: "userRole",
    name: "role",
  },
  userDepartment: {
    key: "userDepartment",
    name: "department",
  },
  userStatus: {
    key: "userStatus",
    name: "status",
  },
} as const;

type FormFieldConfig = {
  [K in string]: IFormField<IFormType>;
};

// ===== Auth Form =====
const FORM_FIELD_CONFIG_AUTH: FormFieldConfig = {
  [FORM_FIELD.email.key]: {
    name: FORM_FIELD.email.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_email", { ns: "auth" }),
    data: {
      required: true,
      placeholder: i18n.t("form.placeholder_email", { ns: "auth" }),
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.username.key]: {
    name: FORM_FIELD.username.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_username", { ns: "auth" }),
    data: {
      required: true,
      placeholder: i18n.t("form.placeholder_username", { ns: "auth" }),
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.department.key]: {
    name: FORM_FIELD.department.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_department", { ns: "auth" }),
    data: {
      required: true,
      placeholder: i18n.t("form.placeholder_department", { ns: "auth" }),
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.password.key]: {
    name: FORM_FIELD.password.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_password", { ns: "auth" }),
    data: {
      required: true,
      placeholder: i18n.t("form.placeholder_password", { ns: "auth" }),
      type: "password",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.confirmPassword.key]: {
    name: FORM_FIELD.confirmPassword.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_confirm_password", { ns: "auth" }),
    data: {
      required: true,
      placeholder: i18n.t("form.placeholder_confirm_password", { ns: "auth" }),
      type: "password",
      inputDelay: 0,
    },
  } as IFormField<"input">,
};

// ===== Field Form =====
const FORM_FIELD_CONFIG_FIELD: FormFieldConfig = {
  [FORM_FIELD.fieldName.key]: {
    name: FORM_FIELD.fieldName.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_name", { ns: "field" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputDelay: 0,
      inputProps: {
        className: "w-[200px]",
      },
    },
  } as IFormField<"input">,

  [FORM_FIELD.fieldVariable.key]: {
    name: FORM_FIELD.fieldVariable.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_variable", { ns: "field" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputDelay: 0,
      inputProps: {
        className: "w-[200px]",
      },
    },
  } as IFormField<"input">,

  [FORM_FIELD.fieldRequired.key]: {
    name: FORM_FIELD.fieldRequired.name,
    type: FORM_TYPES.select,
    label: i18n.t("form.label_required", { ns: "field" }),
    data: {
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      selectWrapperClassName: "w-[200px]",
      placeholder: "",
      options: [],
    },
  } as IFormField<"select">,
};

// ===== Product Form =====
const FORM_FIELD_CONFIG_PRODUCT: FormFieldConfig = {
  [FORM_FIELD.productKey.key]: {
    name: FORM_FIELD.productKey.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_key", { ns: "product" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold mb-0 translate-y-1",
      inputWrapperClassName: "w-[250px] lg:w-[350px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.productName.key]: {
    name: FORM_FIELD.productName.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_name", { ns: "product" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[250px] lg:w-[350px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,
};

// ===== License Form =====
const FORM_FIELD_CONFIG_LICENSE: FormFieldConfig = {
  [FORM_FIELD.licenseKey.key]: {
    name: FORM_FIELD.licenseKey.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_key", { ns: "license" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[300px]",
      inputDelay: 0,
      showCopyIcon: true,
    },
  } as IFormField<"input">,

  [FORM_FIELD.licenseProductId.key]: {
    name: FORM_FIELD.licenseProductId.name,
    type: FORM_TYPES.select,
    label: i18n.t("form.label_product_id", { ns: "license" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      selectWrapperClassName: "w-[200px] lg:w-[300px]",
      placeholder: "",
    },
  } as IFormField<"select">,

  [FORM_FIELD.licenseCreatorUsername.key]: {
    name: FORM_FIELD.licenseCreatorUsername.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_creator", { ns: "license" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[300px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.licenseCustomer.key]: {
    name: FORM_FIELD.licenseCustomer.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_customer", { ns: "license" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[300px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.licenseDescription.key]: {
    name: FORM_FIELD.licenseDescription.name,
    type: FORM_TYPES.textarea,
    label: i18n.t("form.label_description", { ns: "license" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      textAreaWrapperClassName: "w-[200px] lg:w-[300px]",
      inputDelay: 0,
    },
  } as IFormField<"textarea">,
};

// ===== User Form =====
const FORM_FIELD_CONFIG_USER: FormFieldConfig = {
  [FORM_FIELD.userEmail.key]: {
    name: FORM_FIELD.userEmail.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_email", { ns: "user" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[250px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.userUserName.key]: {
    name: FORM_FIELD.userUserName.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_username", { ns: "user" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[250px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.userCurrentPassword.key]: {
    name: FORM_FIELD.userCurrentPassword.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_current_password", { ns: "auth" }),
    data: {
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[250px] lg:min-w-[250px]",
      placeholder: i18n.t("form.placeholder_confirm_password", { ns: "auth" }),
      type: "password",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.userPassword.key]: {
    name: FORM_FIELD.userPassword.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_password", { ns: "user" }),
    data: {
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[250px]",
      placeholder: i18n.t("form.placeholder_password", { ns: "user" }),
      type: "password",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.userConfirmPassword.key]: {
    name: FORM_FIELD.userConfirmPassword.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_confirm_password", { ns: "auth" }),
    data: {
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[250px] lg:min-w-[250px]",
      placeholder: i18n.t("form.placeholder_confirm_password", { ns: "auth" }),
      type: "password",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.userDepartment.key]: {
    name: FORM_FIELD.userDepartment.name,
    type: FORM_TYPES.input,
    label: i18n.t("form.label_department", { ns: "user" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      inputWrapperClassName: "w-[200px] lg:w-[250px]",
      inputDelay: 0,
    },
  } as IFormField<"input">,

  [FORM_FIELD.userRole.key]: {
    name: FORM_FIELD.userRole.name,
    type: FORM_TYPES.select,
    label: i18n.t("form.label_role", { ns: "user" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      selectWrapperClassName: "w-[200px] lg:w-[250px]",
      placeholder: "",
    },
  } as IFormField<"select">,

  [FORM_FIELD.userStatus.key]: {
    name: FORM_FIELD.userStatus.name,
    type: FORM_TYPES.select,
    label: i18n.t("form.label_status", { ns: "user" }),
    data: {
      required: true,
      className: "flex items-center justify-between gap-5 w-full",
      labelClassName: "font-semibold translate-y-1",
      selectWrapperClassName: "w-[200px] lg:w-[250px]",
      placeholder: "",
      options: STATUS_OPTIONS,
    },
  } as IFormField<"select">,
};

const FORM_FIELD_CONFIG: FormFieldConfig = {
  ...FORM_FIELD_CONFIG_AUTH,
  ...FORM_FIELD_CONFIG_FIELD,
  ...FORM_FIELD_CONFIG_PRODUCT,
  ...FORM_FIELD_CONFIG_LICENSE,
  ...FORM_FIELD_CONFIG_USER,
};

// Helper function to get field by type
function getFieldsByType<T extends IFormType>(fields: string[]): IFormField<T>[] {
  return fields
    .map(field => FORM_FIELD_CONFIG[FORM_FIELD[field as keyof typeof FORM_FIELD].key])
    .filter((field): field is IFormField<T> => (field.type as IFormType) === FORM_TYPES[field.type]);
}

// Helper function to field by group
const getAuthFields = {
  login: () => getFieldsByType<"input">([FORM_FIELD.email.key, FORM_FIELD.password.key]),
  register: () =>
    getFieldsByType<"input">([FORM_FIELD.email.key, FORM_FIELD.password.key, FORM_FIELD.confirmPassword.key]),
};

const getFieldFormFields = () =>
  getFieldsByType<IFormType>([
    FORM_FIELD.fieldName.key,
    FORM_FIELD.fieldType.key,
    FORM_FIELD.fieldVariable.key,
    FORM_FIELD.fieldRequired.key,
  ]);

const getProductFormFields = () =>
  getFieldsByType<IFormType>([FORM_FIELD.productName.key, FORM_FIELD.productKey.key, FORM_FIELD.productFields.key]);

const getLicenseFormFields = ({ readOnly }: IGetLicenseFormFields = {}) => {
  let fieldList = [];
  const defaultFieldList = [
    FORM_FIELD.licenseProductId.key,
    FORM_FIELD.licenseCustomer.key,
    FORM_FIELD.licenseCreatorUsername.key,
    FORM_FIELD.licenseDescription.key,
  ];

  if (readOnly) {
    fieldList = _.concat(FORM_FIELD.licenseKey.key, defaultFieldList);
  } else {
    fieldList = defaultFieldList;
  }

  return getFieldsByType<IFormType>(fieldList);
};

export {
  FORM_FIELD,
  FORM_FIELD_CONFIG,
  FORM_MODE,
  getAuthFields,
  getFieldFormFields,
  getFieldsByType,
  getLicenseFormFields,
  getProductFormFields,
};
export type { FormFieldConfig };
