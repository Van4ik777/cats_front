import React from 'react'

export const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-red-600 text-sm mt-1 ">{message}</p>
}
