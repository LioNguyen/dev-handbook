import { z } from "zod";

import {
  emailSchema,
  numberSchema,
  optionalPasswordSchema,
  passwordSchema,
  stringSchema,
} from "@/shared/constants/schema";
import { i18n } from "@/shared/locale";

const userBaseSchema = z.object({
  id: numberSchema,
  email: emailSchema,
  username: stringSchema,
  role: stringSchema,
  department: stringSchema,
  status: stringSchema,
});

const createUserSchema = userBaseSchema.omit({ id: true }).extend({
  password: passwordSchema,
});

const updateUserSchema = userBaseSchema.omit({
  id: true,
});

const updateUserProfileSchema = userBaseSchema
  .omit({
    id: true,
    email: true,
    role: true,
    status: true,
  })
  .extend({
    currentPassword: z.string().optional(),
    password: optionalPasswordSchema.optional(),
    confirmPassword: z.string().optional(),
  })
  ?.refine(
    data =>
      (data?.currentPassword && data?.password && data?.confirmPassword) ||
      (!data?.currentPassword && !data?.password && !data?.confirmPassword) ||
      (data?.currentPassword && (!data?.password || !data?.confirmPassword)),
    {
      message: i18n.t("errors.required_password", { ns: "auth" }),
      path: ["currentPassword"],
    },
  )
  ?.refine(
    data =>
      (!data?.currentPassword && !data?.password && !data?.confirmPassword) ||
      (data?.password && data?.password === data?.confirmPassword),
    {
      message: i18n.t("errors.password_not_match", { ns: "auth" }),
      path: ["confirmPassword"],
    },
  );

export { createUserSchema, updateUserProfileSchema, updateUserSchema, userBaseSchema };
