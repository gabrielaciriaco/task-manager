import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import { BarChartIcon, BoardIcon, LogoutIcon, MenuIcon } from 'components/Icons'
import Button from 'components/Button'
import { getCurrentUser, logout } from 'infra'
import { User } from 'domains/user/models/User'

export default function PageHeader(): ReactElement {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        getCurrentUser().then(setUser)
    }, [])

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const history = useHistory()

    const handleLogout = () => {
        logout()
        history.push('/login')
    }

    const pages = [
        { title: 'Board', href: '/board', Icon: BoardIcon },
        { title: 'Insights', href: '/insights', Icon: BarChartIcon },
    ]

    const isCurrentPage = (href: string) => {
        return history.location.pathname === href
    }

    return (
        <AppBar sx={{ px: 2 }} color="transparent" position="static">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    component="a"
                    onClick={() => {
                        history.push('/')
                    }}
                    sx={{
                        cursor: 'pointer',
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                        pr: 2,
                        borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                >
                    Task Manager
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page, index) => (
                        <Button
                            key={page.title}
                            onClick={() => history.push(page.href)}
                            color="primary"
                            sx={{
                                my: 2,
                                ...(!isCurrentPage(page.href) && { color: 'inherit' }),
                                textTransform: 'none',
                                fontSize: '16px',
                                ml: index > 0 ? 2 : 0,
                            }}
                        >
                            <page.Icon sx={{ mr: 1 }} />
                            {page.title}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        disableScrollLock
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        keepMounted
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                <Typography
                                    sx={{ display: 'flex' }}
                                    onClick={() => {
                                        history.push(page.href)
                                    }}
                                    textAlign="center"
                                >
                                    <page.Icon sx={{ mr: 1 }} />
                                    {page.title}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Typography
                    variant="h6"
                    component="a"
                    onClick={() => {
                        history.push('/')
                    }}
                    sx={{
                        cursor: 'pointer',
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Task Manager
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings" arrow>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                sx={{ width: '48px', height: '48px' }}
                                alt="Remy Sharp"
                                src={user?.photo}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        disableScrollLock
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        keepMounted
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={handleLogout} sx={{ display: 'flex' }}>
                                <LogoutIcon sx={{ mr: 1 }} />
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
