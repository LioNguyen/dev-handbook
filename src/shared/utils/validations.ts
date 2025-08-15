import { z } from 'zod'
import type { FieldError, FieldErrors } from 'react-hook-form'

// Common validation patterns
export const ValidationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  password:
    'Password must contain at least 8 characters, one uppercase, one lowercase, and one number',
  confirmPassword: 'Passwords do not match',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  alphanumeric: 'Only letters and numbers are allowed',
  numeric: 'Only numbers are allowed',
  positive: 'Must be a positive number',
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be no more than ${max}`,
}

// Common field validations
export const commonValidations = {
  email: z
    .string()
    .min(1, ValidationMessages.required)
    .email(ValidationMessages.email),

  password: z
    .string()
    .min(1, ValidationMessages.required)
    .min(8, ValidationMessages.minLength(8))
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, ValidationMessages.password),

  confirmPassword: z.string().min(1, ValidationMessages.required),

  name: z
    .string()
    .min(1, ValidationMessages.required)
    .min(2, ValidationMessages.minLength(2))
    .max(50, ValidationMessages.maxLength(50)),

  phone: z
    .string()
    .regex(/^[+]?[0-9\s\-()]{10,}$/, ValidationMessages.phone)
    .optional(),

  url: z.string().url(ValidationMessages.url).optional(),

  id: z.string().min(1, ValidationMessages.required),

  optionalId: z.string().optional(),

  requiredString: z.string().min(1, ValidationMessages.required),

  optionalString: z.string().optional(),

  positiveNumber: z.number().positive(ValidationMessages.positive),

  optionalPositiveNumber: z
    .number()
    .positive(ValidationMessages.positive)
    .optional(),
}

// Authentication schemas
export const authSchemas = {
  login: z.object({
    email: commonValidations.email,
    password: z.string().min(1, ValidationMessages.required),
    rememberMe: z.boolean().optional(),
  }),

  register: z
    .object({
      name: commonValidations.name,
      email: commonValidations.email,
      password: commonValidations.password,
      confirmPassword: z.string().min(1, ValidationMessages.required),
      terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ValidationMessages.confirmPassword,
      path: ['confirmPassword'],
    }),

  forgotPassword: z.object({
    email: commonValidations.email,
  }),

  resetPassword: z
    .object({
      token: z.string().min(1, ValidationMessages.required),
      password: commonValidations.password,
      confirmPassword: z.string().min(1, ValidationMessages.required),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ValidationMessages.confirmPassword,
      path: ['confirmPassword'],
    }),

  changePassword: z
    .object({
      currentPassword: z.string().min(1, ValidationMessages.required),
      newPassword: commonValidations.password,
      confirmNewPassword: z.string().min(1, ValidationMessages.required),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: ValidationMessages.confirmPassword,
      path: ['confirmNewPassword'],
    }),
}

// User schemas
export const userSchemas = {
  create: z.object({
    name: commonValidations.name,
    email: commonValidations.email,
    role: z.enum(['admin', 'user']).default('user'),
    avatar: commonValidations.optionalString,
  }),

  update: z.object({
    id: commonValidations.id,
    name: commonValidations.name.optional(),
    email: commonValidations.email.optional(),
    role: z.enum(['admin', 'user']).optional(),
    avatar: commonValidations.optionalString,
  }),

  profile: z.object({
    name: commonValidations.name,
    email: commonValidations.email,
    phone: commonValidations.phone,
    avatar: commonValidations.optionalString,
    bio: z.string().max(500, ValidationMessages.maxLength(500)).optional(),
  }),
}

// CRUD operation schemas
export const crudSchemas = {
  pagination: z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
  }),

  bulkDelete: z.object({
    ids: z.array(z.string()).min(1, 'At least one item must be selected'),
  }),

  bulkUpdate: z.object({
    ids: z.array(z.string()).min(1, 'At least one item must be selected'),
    data: z.record(z.string(), z.unknown()),
  }),
}

// Form schemas
export const formSchemas = {
  contact: z.object({
    name: commonValidations.name,
    email: commonValidations.email,
    subject: z
      .string()
      .min(1, ValidationMessages.required)
      .max(100, ValidationMessages.maxLength(100)),
    message: z
      .string()
      .min(1, ValidationMessages.required)
      .max(1000, ValidationMessages.maxLength(1000)),
  }),

  search: z.object({
    query: z.string().min(1, ValidationMessages.required),
    filters: z.record(z.string(), z.unknown()).optional(),
  }),

  settings: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    language: z.enum(['en', 'es']).default('en'),
    notifications: z
      .object({
        email: z.boolean().default(true),
        push: z.boolean().default(true),
        sms: z.boolean().default(false),
      })
      .default({
        email: true,
        push: true,
        sms: false,
      }),
  }),
}

// Type inference helpers
export type LoginForm = z.infer<typeof authSchemas.login>
export type RegisterForm = z.infer<typeof authSchemas.register>
export type ForgotPasswordForm = z.infer<typeof authSchemas.forgotPassword>
export type ResetPasswordForm = z.infer<typeof authSchemas.resetPassword>
export type ChangePasswordForm = z.infer<typeof authSchemas.changePassword>

export type CreateUserForm = z.infer<typeof userSchemas.create>
export type UpdateUserForm = z.infer<typeof userSchemas.update>
export type ProfileForm = z.infer<typeof userSchemas.profile>

export type PaginationForm = z.infer<typeof crudSchemas.pagination>
export type BulkDeleteForm = z.infer<typeof crudSchemas.bulkDelete>
export type BulkUpdateForm = z.infer<typeof crudSchemas.bulkUpdate>

export type ContactForm = z.infer<typeof formSchemas.contact>
export type SearchForm = z.infer<typeof formSchemas.search>
export type SettingsForm = z.infer<typeof formSchemas.settings>

// Validation utilities
export const validateField = <T>(
  schema: z.ZodSchema<T>,
  value: unknown
): T | null => {
  try {
    return schema.parse(value)
  } catch {
    return null
  }
}

export const getFieldErrors = <T>(
  schema: z.ZodSchema<T>,
  value: unknown
): Record<string, string[]> => {
  try {
    schema.parse(value)
    return {}
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.flatten().fieldErrors as Record<string, string[]>
    }
    return {}
  }
}

export const isValidField = <T>(
  schema: z.ZodSchema<T>,
  value: unknown
): boolean => {
  try {
    schema.parse(value)
    return true
  } catch {
    return false
  }
}

// Enhanced validation utilities
export const validationUtils = {
  // Check if a field has errors
  hasError: (fieldName: string, errors: FieldErrors): boolean => {
    return !!errors[fieldName]
  },

  // Get error message for a field
  getErrorMessage: (
    fieldName: string,
    errors: FieldErrors
  ): string | undefined => {
    const error = errors[fieldName] as FieldError | undefined
    return error?.message
  },

  // Get all error messages as array
  getAllErrors: (errors: FieldErrors): string[] => {
    const messages: string[] = []

    const extractErrors = (obj: Record<string, unknown>, path = ''): void => {
      Object.keys(obj).forEach((key) => {
        const fullPath = path ? `${path}.${key}` : key
        const value = obj[key]

        if (
          value &&
          typeof value === 'object' &&
          'message' in value &&
          typeof value.message === 'string'
        ) {
          messages.push(value.message)
        } else if (
          value &&
          typeof value === 'object' &&
          !Array.isArray(value)
        ) {
          extractErrors(value as Record<string, unknown>, fullPath)
        }
      })
    }

    extractErrors(errors)
    return messages
  },

  // Format server errors for display
  formatServerErrors: (
    serverErrors: Record<string, string | string[]>
  ): Record<string, { message: string }> => {
    const formatted: Record<string, { message: string }> = {}

    Object.entries(serverErrors).forEach(([field, error]) => {
      if (Array.isArray(error)) {
        formatted[field] = { message: error.join(', ') }
      } else if (typeof error === 'string') {
        formatted[field] = { message: error }
      }
    })

    return formatted
  },

  // Validate specific field value
  validateField: <T>(
    schema: z.ZodSchema<T>,
    value: unknown
  ): { success: boolean; error?: string } => {
    try {
      schema.parse(value)
      return { success: true }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.issues[0]?.message }
      }
      return { success: false, error: 'Invalid value' }
    }
  },

  // Debounced field validation
  createDebouncedValidator: <T>(schema: z.ZodSchema<T>, delay = 300) => {
    let timeoutId: NodeJS.Timeout | null = null

    return (
      value: unknown,
      callback: (result: { success: boolean; error?: string }) => void
    ) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        const result = validationUtils.validateField(schema, value)
        callback(result)
      }, delay)
    }
  },
}

// Enhanced common validations with better error messages
export const enhancedValidations = {
  // Email with additional validation
  strictEmail: z
    .string()
    .min(1, ValidationMessages.required)
    .email(ValidationMessages.email)
    .refine(
      (email) => {
        // Check for common email format issues
        const hasValidDomain = email.includes('.') && !email.endsWith('.')
        const hasValidLocal = !email.startsWith('.') && !email.includes('..')
        return hasValidDomain && hasValidLocal
      },
      { message: 'Please enter a valid email format' }
    ),

  // Strong password validation
  strongPassword: z
    .string()
    .min(1, ValidationMessages.required)
    .min(8, ValidationMessages.minLength(8))
    .max(128, ValidationMessages.maxLength(128))
    .regex(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .regex(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .regex(/^(?=.*\d)/, 'Password must contain at least one number')
    .regex(
      /^(?=.*[@$!%*?&])/,
      'Password must contain at least one special character'
    ),

  // Username validation
  username: z
    .string()
    .min(1, ValidationMessages.required)
    .min(3, ValidationMessages.minLength(3))
    .max(30, ValidationMessages.maxLength(30))
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .regex(/^[a-zA-Z]/, 'Username must start with a letter'),

  // File validation
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, 'Please select a file')
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'File size must be less than 5MB'
    ),

  // Image file validation
  imageFile: z
    .custom<File>()
    .refine((file) => file instanceof File, 'Please select a file')
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      'Image size must be less than 2MB'
    )
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type
        ),
      'Only JPEG, PNG, GIF, and WebP images are allowed'
    ),

  // Date validations
  pastDate: z
    .date()
    .refine((date) => date < new Date(), 'Date must be in the past'),

  futureDate: z
    .date()
    .refine((date) => date > new Date(), 'Date must be in the future'),

  dateRange: (minDate?: Date, maxDate?: Date) =>
    z.date().refine((date) => {
      if (minDate && date < minDate) return false
      if (maxDate && date > maxDate) return false
      return true
    }, `Date must be between ${minDate?.toLocaleDateString()} and ${maxDate?.toLocaleDateString()}`),

  // Number validations
  currency: z
    .number()
    .positive('Amount must be positive')
    .multipleOf(0.01, 'Amount can only have up to 2 decimal places')
    .max(999999.99, 'Amount cannot exceed $999,999.99'),

  percentage: z
    .number()
    .min(0, 'Percentage cannot be negative')
    .max(100, 'Percentage cannot exceed 100%'),

  // Array validations
  nonEmptyArray: <T>(itemSchema: z.ZodSchema<T>) =>
    z.array(itemSchema).min(1, 'At least one item is required'),

  maxItems: <T>(itemSchema: z.ZodSchema<T>, max: number) =>
    z.array(itemSchema).max(max, `Cannot have more than ${max} items`),
}

// Schema composition helpers
export const createOptionalSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return schema.optional()
}

export const createArraySchema = <T extends z.ZodTypeAny>(schema: T) => {
  return z.array(schema)
}

export const createPaginatedSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) => {
  return z.object({
    data: z.array(dataSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  })
}

// API response schemas
export const apiSchemas = {
  success: <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
      success: z.literal(true),
      data: dataSchema,
      message: z.string().optional(),
    }),

  error: z.object({
    success: z.literal(false),
    error: z.object({
      message: z.string(),
      code: z.string().optional(),
      details: z.unknown().optional(),
    }),
  }),

  paginated: <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
      success: z.literal(true),
      data: createPaginatedSchema(itemSchema),
      message: z.string().optional(),
    }),
}
