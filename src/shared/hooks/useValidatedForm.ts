import { useState, useCallback } from 'react'
import type { FieldValues, FieldErrors } from 'react-hook-form'

export interface FormState {
  isSubmitting: boolean
  submitAttempted: boolean
  serverErrors: Record<string, string | string[]>
  successMessage: string
  isSuccess: boolean
}

export interface UseFormValidationOptions<T extends FieldValues> {
  onSubmit: (data: T) => Promise<void>
  onError?: (errors: Record<string, string | string[]>) => void
}

export const useFormValidation = <T extends FieldValues>({
  onSubmit,
  onError,
}: UseFormValidationOptions<T>) => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    submitAttempted: false,
    serverErrors: {},
    successMessage: '',
    isSuccess: false,
  })

  // Clear messages when form is interacted with
  const clearMessages = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      serverErrors: {},
      successMessage: '',
      isSuccess: false,
    }))
  }, [])

  // Set server errors
  const setServerErrors = useCallback(
    (errors: Record<string, string | string[]>) => {
      setFormState((prev) => ({
        ...prev,
        serverErrors: errors,
        successMessage: '',
        isSuccess: false,
      }))

      if (onError) {
        onError(errors)
      }
    },
    [onError]
  )

  // Set success message
  const setSuccessMessage = useCallback((message: string) => {
    setFormState((prev) => ({
      ...prev,
      successMessage: message,
      serverErrors: {},
      isSuccess: true,
    }))
  }, [])

  // Enhanced submit handler with error handling
  const handleFormSubmit = useCallback(
    async (data: T) => {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: true,
        submitAttempted: true,
        serverErrors: {},
        successMessage: '',
        isSuccess: false,
      }))

      try {
        await onSubmit(data)
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
        }))
      } catch (error: unknown) {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSuccess: false,
        }))

        if (error && typeof error === 'object' && 'response' in error) {
          const response = error.response as {
            data?: { errors?: Record<string, string | string[]> }
          }
          if (response.data?.errors) {
            setServerErrors(response.data.errors)
            return
          }
        }

        // Generic error handling
        if (error instanceof Error) {
          setServerErrors({ general: error.message })
        } else {
          setServerErrors({
            general: 'An unexpected error occurred. Please try again.',
          })
        }
      }
    },
    [onSubmit, setServerErrors]
  )

  // Get field error with touched state
  const getFieldError = useCallback(
    (
      fieldName: string,
      formErrors: FieldErrors,
      touched: Record<string, boolean> = {}
    ) => {
      const error = formErrors[fieldName]
      const fieldTouched = touched[fieldName]
      return {
        error: error?.message,
        touched: fieldTouched || formState.submitAttempted,
      }
    },
    [formState.submitAttempted]
  )

  // Check if form has any errors
  const hasErrors = useCallback(
    (formErrors: FieldErrors) => {
      return (
        Object.keys(formErrors).length > 0 ||
        Object.keys(formState.serverErrors).length > 0
      )
    },
    [formState.serverErrors]
  )

  return {
    formState,
    handleFormSubmit,
    getFieldError,
    setServerErrors,
    setSuccessMessage,
    clearMessages,
    hasErrors,
  }
}
