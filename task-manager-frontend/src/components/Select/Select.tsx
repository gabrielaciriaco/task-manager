import React from 'react'
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select'

type SelectProps = MuiSelectProps

const Select = (props: SelectProps) => {
    return <MuiSelect {...props} />
}

export default Select
export type { SelectProps }
