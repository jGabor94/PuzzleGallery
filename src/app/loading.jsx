import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Loading() {


    return (
        <Stack alignItems="center" justifyContent="center" width="100%" height={700} gap={2} >
            <Typography>Betöltés...</Typography>
            <CircularProgress />
        </Stack>
    )
}