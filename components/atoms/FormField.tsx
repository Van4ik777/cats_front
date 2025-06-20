import React from 'react'
import { Input } from './Input' 

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}



export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        <Input
          id={id}
          ref={ref}
          className={className}
          {...props}
        />
      </div>
    )
  }
)

FormField.displayName = 'FormField'