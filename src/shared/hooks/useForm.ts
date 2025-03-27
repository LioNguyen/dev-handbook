/* eslint-disable react-hooks/exhaustive-deps */
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { z } from "zod";

import { IFormField, IFormType } from "@/components/form";

interface IUseFormProps<T extends Record<string, any>> {
  fields: IFormField<IFormType>[];
  schema?: z.ZodSchema<T>;
  initialValues?: Partial<T>;
}

function useForm<T extends Record<string, any>>({ fields, schema, initialValues = {} }: IUseFormProps<T>) {
  type TFormData = T | (typeof schema extends z.ZodSchema ? z.infer<typeof schema> : T);

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof TFormData, string>>>({});
  const [formValues, setFormValues] = useState<TFormData>({ ...initialValues } as TFormData);

  const formValidate = () => {
    if (!schema) {
      setFormErrors({});
      return true;
    }

    try {
      schema.parse(formValues);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof TFormData, string>> = {};

        error.errors.forEach(err => {
          const path = err.path[0] as keyof TFormData;
          errors[path] = err.message;
        });

        setFormErrors(errors);
        console.error(errors);
        return false;
      }
    }
  };

  const handleFormChange = (name: keyof TFormData, value: any) => {
    setIsFormChanged(true);
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const getFieldData = (name: keyof TFormData) => ({
    error: formErrors?.[name],
    onChange: (value: any) => handleFormChange(name, value),
    value: formValues?.[name],
  });

  const formFields = fields.map(field => {
    return {
      ...field,
      data: {
        ...field.data,
        ...getFieldData(field.name as keyof TFormData),
      },
    };
  });

  const resetForm = () => {
    setFormValues({ ...initialValues } as TFormData);
    setFormErrors({});
    setIsFormChanged(false);
  };

  const clearErrors = () => {
    setFormErrors({});
  };

  // NOTE: ⚡ Set isFormChanged false when there is no difference between new values and initial values
  useEffect(() => {
    if (isEqual(initialValues, formValues)) {
      setIsFormChanged(false);
    }
  }, [formValues]);

  return {
    formErrors,
    formFields,
    formValidate,
    formValues,
    isFormChanged,
    setFormValues,
    setFormErrors,
    resetForm,
    clearErrors,
  };
}

export { useForm };
export type { IUseFormProps };
