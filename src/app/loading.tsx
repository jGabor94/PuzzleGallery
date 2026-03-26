import { CircularProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";

const Loading: FC<{}> = () => (
    <Stack alignItems="center" justifyContent="center" width="100%" height={700} gap={2} >
        <Typography>Betöltés...</Typography>
        <CircularProgress />
    </Stack>
)

export default Loading