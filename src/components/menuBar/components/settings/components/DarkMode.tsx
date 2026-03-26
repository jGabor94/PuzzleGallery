"use client"

import SA_ConfigUpdate from "@/lib/actions/user/configUpdate";
import useColorMode from "@/lib/hooks/useColorMode";
import { ColorModeSwitch } from "@/lib/mui/styled"
import { Stack, Typography, useTheme } from "@mui/material";
import { FC, useEffect } from "react"


const DarkMode: FC<{}> = () => {

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

export default DarkMode