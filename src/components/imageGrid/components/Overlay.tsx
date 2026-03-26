import { Box, Stack, Typography, styled } from "@mui/material";
import { FC, Fragment } from "react";

const Text = styled(Typography)({
    display: "inline",
    color: "#fff"
})

type OverlayProps = {
    index: number,
    name: string,
    createdAt: any
}

const Overlay: FC<OverlayProps> = ({ index, name, createdAt }) => {
    return (
        <Stack sx={{
            position: "absolute",
            bottom: 0,
            zIndex: 20,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            gap: 0.5,
            padding: 2
        }}>
            <Fragment>
                <Box>
                    <Text fontWeight={600} >Kép neve: </Text>
                    <Text>{name}</Text>
                </Box>
                <Box>
                    <Text fontWeight={600}>Feltöltve: </Text>
                    <Text>{new Date(createdAt).toLocaleString("HU-hu")}</Text>
                </Box>
            </Fragment>
        </Stack>
    )
}

export default Overlay