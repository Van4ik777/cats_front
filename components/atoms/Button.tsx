import React from 'react'
import { Button as MantineButton } from '@mantine/core'
import { IconCat } from '@tabler/icons-react'

interface ButtonProps extends React.ComponentProps<typeof MantineButton> {
  withCatIcon?: boolean
  children?: React.ReactNode
  color?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

}


export const Button = ({ children, withCatIcon = false, size = 'md', ...props }: ButtonProps) => {
  return (
    <MantineButton
      size={size}
      {...props}
      styles={(theme) => ({
        root: {
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          '&:hover': {
            backgroundColor: theme.colors.dark[7],
          },
        }
      })}
    >
      {children}
    </MantineButton>
  )
}
