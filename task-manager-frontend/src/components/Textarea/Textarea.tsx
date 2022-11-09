import React, { ReactElement } from 'react'
import MuiInput, { InputProps as MuiInputProps } from '@mui/material/Input'

type TextareaProps = MuiInputProps

function Textarea(props: TextareaProps): ReactElement {
    return <MuiInput disableUnderline maxRows={3} multiline {...props} />
}

export default Textarea
export type { TextareaProps }
