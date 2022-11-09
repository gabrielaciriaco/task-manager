import React, { forwardRef } from 'react'
import MuiInput, { InputProps as MuiInputProps } from '@mui/material/Input'

type InputProps = MuiInputProps

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    return <MuiInput disableUnderline {...props} ref={ref} />
})

export default Input
export type { InputProps }
