import { format } from "date-fns";
import { z } from "zod";

import { i18n } from "@/shared/locale";
import { DATETIME_VALID_TOKENS } from "./common";

const emailSchema = z
  .string({
    required_error: i18n.t("errors.invalid_email", { ns: "auth" }),
  })
  .email(i18n.t("errors.invalid_email", { ns: "auth" }))
  .refine(email => email.endsWith("@igloo.co.kr"), {
    message: i18n.t("errors.invalid_email_domain", { ns: "auth" }),
  });

const passwordSchema = z
  .string({
    required_error: i18n.t("errors.invalid_password", { ns: "auth" }),
  })
  .min(8, i18n.t("passwordRules.requirements.minimum_length", { ns: "auth" }))
  .regex(/[A-Z]/, i18n.t("passwordRules.requirements.uppercase_letter", { ns: "auth" }))
  .regex(/[a-z]/, i18n.t("passwordRules.requirements.lowercase_letter", { ns: "auth" }))
  .regex(/[0-9]/, i18n.t("passwordRules.requirements.number", { ns: "auth" }))
  .regex(/[!@#$%^&*]/, i18n.t("passwordRules.requirements.special_character", { ns: "auth" }));

const optionalPasswordSchema = z.string().refine(
  val => val === "" || passwordSchema.safeParse(val).success,
  val => {
    if (val === "") return { pass: true };
    const result = passwordSchema.safeParse(val);
    return result.success ? { pass: true } : { pass: false, message: result.error.issues[0].message };
  },
);

const ipAddressSchema = z
  .string()
  .regex(/^(\d{1,3}\.){3}\d{1,3}$/, i18n.t("errors.invalid_ip_format"))
  .refine(
    value => {
      const parts = value.split(".");
      return parts.every(part => {
        const num = parseInt(part);
        return !isNaN(num) && num >= 0 && num <= 255;
      });
    },
    {
      message: i18n.t("errors.invalid_ip_range"),
    },
  );

const macAddressSchema = z.string().regex(/^([0-9A-F]{2}:){5}[0-9A-F]{2}$/, i18n.t("errors.invalid_mac_format"));

const anySchema = z.any();
const numberArraySchema = z.array(z.number());
const numberSchema = z.number({ invalid_type_error: i18n.t("errors.required") });
const booleanSchema = z.boolean({ invalid_type_error: i18n.t("errors.required") });
const stringSchema = z.string().trim().min(1, i18n.t("errors.required"));

const validateTokens = (value: string) => {
  if (!value) return false;
  const parts = value.split(/[^a-zA-Z]+/).filter(Boolean);
  return parts.every(part => DATETIME_VALID_TOKENS.includes(part as (typeof DATETIME_VALID_TOKENS)[number]));
};

const validateDateFnsFormat = (value: string) => {
  try {
    format(new Date(), value);
    return true;
  } catch {
    return false;
  }
};

const datetimeFormatSchema = z
  .string({
    required_error: i18n.t("errors.required"),
    invalid_type_error: i18n.t("errors.invalid_type"),
  })
  .min(1, i18n.t("errors.invalid_datetime_format"))
  .refine(validateTokens, {
    message: i18n.t("errors.invalid_datetime_format"),
  })
  .refine(value => validateTokens(value) && validateDateFnsFormat(value), {
    message: i18n.t("errors.invalid_datetime_format"),
  });

export {
  anySchema,
  booleanSchema,
  datetimeFormatSchema,
  emailSchema,
  ipAddressSchema,
  macAddressSchema,
  numberArraySchema,
  numberSchema,
  optionalPasswordSchema,
  passwordSchema,
  stringSchema,
};
