import { forwardRef } from 'react'
import { Input } from '@/components/ui'
import { FieldError } from './FormErrors'
import type { InputHTMLAttributes } from 'react'

export interface ValidatedInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  touched?: boolean
  hint?: string
  required?: boolean
  className?: string
  containerClassName?: string
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      label,
      error,
      touched,
      hint,
      required,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const hasError = error && touched

    return (
      <div className={`space-y-1 ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <Input
          ref={ref}
          className={`${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hint || error ? `${props.id || props.name}-description` : undefined
          }
          {...props}
        />

        {hint && !hasError && (
          <p
            id={`${props.id || props.name}-description`}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {hint}
          </p>
        )}

        <FieldError error={error} touched={touched} />
      </div>
    )
  }
)

ValidatedInput.displayName = 'ValidatedInput'
