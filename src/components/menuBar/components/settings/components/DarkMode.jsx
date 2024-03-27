"use client"

import SA_ConfigUpdate from "@/lib/actions/user/configUpdate";
import useColorMode from "@/lib/hooks/useColorMode";
import { ColorModeSwitch } from "@/lib/mui/styled"
import { useTheme } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react"


export default function DarkMode() {

    const { palette } = useTheme();
    const { toggleColorMode } = useColorMode()

    const onChange = () => {
        toggleColorMode()
    }

    useEffect(() => {
        SA_ConfigUpdate({ theme: palette.mode })
    }, [palette])

    return (
        <Stack direction="row" justifyContent="center" gap={1}>
            <Typography>Világos</Typography>
            <ColorModeSwitch checked={palette.mode === "dark" ? true : false} onChange={onChange} />
            <Typography>Világos</Typography>
        </Stack>
    )
}