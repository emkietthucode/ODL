import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `
        flex
        w-full
        rounded-md
        bg-gray-100
        px-3
        py-3
        text-xs
        file:text-neutral-400
        file:border-0
        file:bg-transparent
        file:text-xs
        file:font-medium
        placeholder:text-neutral-400
        disabled:cursor-not-allowed
        disabled:opacity-50
        focus:outline-none
        transition
        ${error && 'border-red-500 focus:border-red-500'}
      `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
