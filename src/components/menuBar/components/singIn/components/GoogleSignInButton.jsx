import { Box, Button, Stack } from "@mui/material";

export default function GoogleSignInButton(props) {
    return (
        <Button variant="outlined" {...props} >
            <Stack direction="row" alignItems="center" gap={1}>
                <Box component="img" src="/icons/googleButtonLogo.svg" sx={{ width: 25 }} />
                Google Bejelentkezés
            </Stack>
        </Button>
    )
}