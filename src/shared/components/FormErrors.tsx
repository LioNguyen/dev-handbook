import { AlertCircle, X } from 'lucide-react'
import type { FieldErrors } from 'react-hook-form'
import { validationUtils } from '@/shared/lib/validations'

export interface FormErrorsProps {
  errors: FieldErrors
  className?: string
  showFieldNames?: boolean
  maxErrors?: number
  onDismiss?: () => void
}

export const FormErrors = ({
  errors,
  className = '',
  showFieldNames = false,
  maxErrors = 5,
  onDismiss,
}: FormErrorsProps) => {
  const errorMessages = validationUtils.getAllErrors(errors)

  if (errorMessages.length === 0) {
    return null
  }

  const displayedErrors = errorMessages.slice(0, maxErrors)
  const hasMoreErrors = errorMessages.length > maxErrors

  return (
    <div
      className={`rounded-lg border border-red-200 bg-red-50 p-4 ${className}`}
    >
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {errorMessages.length === 1
              ? 'There is an error'
              : `There are ${errorMessages.length} errors`}{' '}
            with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              {displayedErrors.map((error, index) => (
                <li key={index}>
                  {showFieldNames && error.includes(':') ? error : error}
                </li>
              ))}
              {hasMoreErrors && (
                <li className="font-medium">
                  ... and {errorMessages.length - maxErrors} more error
                  {errorMessages.length - maxErrors !== 1 ? 's' : ''}
                </li>
              )}
            </ul>
          </div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export interface FieldErrorProps {
  error?: string
  touched?: boolean
  className?: string
}

export const FieldError = ({
  error,
  touched = true,
  className = '',
}: FieldErrorProps) => {
  if (!error || !touched) {
    return null
  }

  return (
    <div className={`mt-1 flex items-center text-sm text-red-600 ${className}`}>
      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
      <span>{error}</span>
    </div>
  )
}

export interface ServerErrorsProps {
  errors: Record<string, string | string[]>
  className?: string
  onDismiss?: () => void
}

export const ServerErrors = ({
  errors,
  className = '',
  onDismiss,
}: ServerErrorsProps) => {
  const errorEntries = Object.entries(errors).filter(([, error]) => error)

  if (errorEntries.length === 0) {
    return null
  }

  return (
    <div
      className={`rounded-lg border border-red-200 bg-red-50 p-4 ${className}`}
    >
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Server validation errors
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              {errorEntries.map(([field, error]) => {
                const message = Array.isArray(error) ? error.join(', ') : error
                return (
                  <li key={field}>
                    <span className="font-medium capitalize">
                      {field.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                    </span>{' '}
                    {message}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export interface SuccessMessageProps {
  message: string
  className?: string
  onDismiss?: () => void
}

export const SuccessMessage = ({
  message,
  className = '',
  onDismiss,
}: SuccessMessageProps) => {
  return (
    <div
      className={`rounded-lg border border-green-200 bg-green-50 p-4 ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export interface FormMessageProps {
  type: 'error' | 'success' | 'warning' | 'info'
  message: string
  className?: string
  onDismiss?: () => void
}

export const FormMessage = ({
  type,
  message,
  className = '',
  onDismiss,
}: FormMessageProps) => {
  const baseClasses = 'rounded-lg border p-4'
  const typeClasses = {
    error: 'border-red-200 bg-red-50 text-red-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800',
  }

  const iconClasses = {
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      <div className="flex items-start">
        <AlertCircle className={`h-5 w-5 mt-0.5 ${iconClasses[type]}`} />
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={`ml-3 flex-shrink-0 rounded-md p-1.5 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'error'
                ? 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-500 focus:ring-offset-red-50'
                : type === 'success'
                  ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-500 focus:ring-offset-green-50'
                  : type === 'warning'
                    ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-500 focus:ring-offset-yellow-50'
                    : 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-500 focus:ring-offset-blue-50'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
