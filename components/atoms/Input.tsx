import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
        <input
      ref={ref}
      {...props}
      type={props.type || 'text'}
      className={`
        w-full
        px-4 py-3
        text-base text-gray-800
        bg-white
        border border-gray-300
        rounded-lg
        placeholder-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-gray-400
        focus:border-gray-400
        transition duration-200
        ${props.className || ''}
      `}
      placeholder={props.placeholder || 'Type here...'}
    />
  )
})

Input.displayName = 'Input'
