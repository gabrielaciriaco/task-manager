import React from 'react'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

type MenuItemProps = MuiMenuItemProps

const MenuItem = (props: MenuItemProps) => {
    return <MuiMenuItem {...props} />
}

export default MenuItem
export type { MenuItemProps }
