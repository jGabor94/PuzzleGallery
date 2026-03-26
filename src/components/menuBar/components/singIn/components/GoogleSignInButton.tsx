import { Box, Button, ButtonProps, Stack } from "@mui/material";
import { FC } from "react";

const GoogleSignInButton: FC<ButtonProps> = (props) => {
    return (
        <Button variant="outlined" {...props} >
            <Stack direction="row" alignItems="center" gap={1}>
                <Box component="img" src="/icons/googleButtonLogo.svg" sx={{ width: 25 }} />
                Google Bejelentkezés
            </Stack>
        </Button>
    )
}

export default GoogleSignInButton