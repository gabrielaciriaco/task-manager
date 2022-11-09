import React, { ReactElement } from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

type ButtonProps = MuiButtonProps

function Button({ children, ...props }: ButtonProps): ReactElement {
    return <MuiButton {...props}>{children}</MuiButton>
}

export default Button
export type { ButtonProps }
