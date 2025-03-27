import { z } from "zod";

import { emailSchema, passwordSchema, stringSchema } from "@/shared/constants/schema";
import { i18n } from "@/shared/locale";

const forgotPasswordSchema = z.object({
  email: emailSchema.refine(email => email.endsWith("@igloo.co.kr"), {
    message: i18n.t("errors.invalid_email_domain", { ns: "auth" }),
  }),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(5, i18n.t("errors.invalid_password", { ns: "auth" })),
});

const registerSchema = z
  .object({
    email: emailSchema,
    username: stringSchema,
    department: stringSchema,
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: i18n.t("errors.invalid_password", { ns: "auth" }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: i18n.t("errors.password_not_match", { ns: "auth" }),
    path: ["confirmPassword"],
  });

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: i18n.t("errors.invalid_password", { ns: "auth" }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: i18n.t("errors.password_not_match", { ns: "auth" }),
    path: ["confirmPassword"],
  });

export { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema };
