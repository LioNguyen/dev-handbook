import { FORM_TYPES, IFormField, IFormType } from "@/components/form";
import { FORM_FIELD, FORM_FIELD_CONFIG, FORM_MODE } from "@/shared/constants";
import { i18n } from "@/shared/locale";

function getVolumnsValue(value: any) {
  try {
    const volumeData = JSON.parse(value);

    const amount = volumeData.amount || "0";
    const unit = volumeData.unit;
    const period = i18n.t(`${volumeData.period}`);

    return `${amount}${unit} / ${period}`;
  } catch {
    return "-";
  }
}

interface IGetFormFieldsBase {
  disabledFields?: string[];
  readOnlyFields?: string[];
  mode?: keyof typeof FORM_MODE;
}

// Helper function to get field by type
function getFieldsByType<T extends IFormType>(fields: string[]): IFormField<T>[] {
  return fields
    .map(field => FORM_FIELD_CONFIG[FORM_FIELD[field as keyof typeof FORM_FIELD].key])
    .filter((field): field is IFormField<T> => (field.type as IFormType) === FORM_TYPES[field.type]);
}

interface IGetUserFormFields extends IGetFormFieldsBase {}
function getUserFormFields({ mode, disabledFields, readOnlyFields }: IGetUserFormFields) {
  let fieldList = [];

  switch (mode) {
    case FORM_MODE.CREATE:
      fieldList = [
        FORM_FIELD.userEmail.key,
        FORM_FIELD.userUserName.key,
        FORM_FIELD.userPassword.key,
        FORM_FIELD.userRole.key,
        FORM_FIELD.userDepartment.key,
        FORM_FIELD.userStatus.key,
      ];
      break;
    case FORM_MODE.UPDATE:
      fieldList = [
        FORM_FIELD.userEmail.key,
        FORM_FIELD.userUserName.key,
        FORM_FIELD.userRole.key,
        FORM_FIELD.userDepartment.key,
        FORM_FIELD.userStatus.key,
      ];
      break;
    case FORM_MODE.USER_ACCOUNT_UPDATE:
      fieldList = [
        FORM_FIELD.userEmail.key,
        FORM_FIELD.userUserName.key,
        FORM_FIELD.userDepartment.key,
        FORM_FIELD.userCurrentPassword.key,
        FORM_FIELD.userPassword.key,
        FORM_FIELD.userConfirmPassword.key,
      ];
      break;
    default:
      fieldList = [
        FORM_FIELD.userEmail.key,
        FORM_FIELD.userUserName.key,
        FORM_FIELD.userRole.key,
        FORM_FIELD.userDepartment.key,
        FORM_FIELD.userStatus.key,
      ];
      break;
  }

  return getFieldsByType<IFormType>(fieldList).map(field => {
    const disabled = disabledFields?.includes(field.name);
    const readOnly = readOnlyFields?.includes(field.name);

    return {
      ...field,
      data: {
        ...field.data,
        disabled: disabled && !readOnly,
        readOnly,
      },
    };
  });

  return fieldList;
}

export { getFieldsByType, getUserFormFields, getVolumnsValue };
export type { IGetFormFieldsBase, IGetUserFormFields };
