"use client"

import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Fragment, useState } from "react";
import SA_signOut from "@/lib/services/authentication/signOut";
import { useRouter } from "next/navigation";
import Settings from "./settings/Settings";

export default function ProfileMenu({ session }) {

    const router = useRouter()

    const [settingsOpen, setSettingsOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSettingsOpen = () => {
        setSettingsOpen(true)
        handleClose()
    }

    const singOut = async () => {
        await SA_signOut()
        router.refresh()

    }

    return (
        <Fragment>
            <Stack direction="row" gap={1} alignItems="center" onClick={handleClick} sx={{ cursor: "pointer" }}>

                <Typography sx={{ display: { xs: "none", sm: "block" } }}>{session.user.username}</Typography>
                <Avatar src={session.user.image} />
            </Stack>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ zIndex: 100000 }}
                disableScrollLock
            >
                <MenuItem onClick={handleSettingsOpen} >
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Beállítások
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={singOut}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Kijelentkezés
                    </ListItemText>
                </MenuItem>

            </Menu>
            <Settings {...{ open: settingsOpen, setOpen: setSettingsOpen }} />
        </Fragment>

    )
}