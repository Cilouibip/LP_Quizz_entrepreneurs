'use client'

import { clsx } from 'clsx'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full bg-white border rounded-xl px-4 py-3 text-text-primary',
            'focus:ring-2 focus:ring-[#FF9B71]/20 focus:border-[#FF9B71] focus:outline-none',
            'transition-all duration-200',
            error ? 'border-red-500' : 'border-gray-200',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-sm text-text-muted">{hint}</p>
        )}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
