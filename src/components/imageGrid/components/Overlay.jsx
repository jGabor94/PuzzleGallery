import { Box, Stack, Typography, styled } from "@mui/material";
import { Fragment } from "react";

const Text = styled(Typography)({
    display: "inline",
    color: "#fff"
})

export default function Overlay({ index, images }) {

    const image = images[index]

    return image && (
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
                    <Text>{image.name}</Text>
                </Box>
                <Box>
                    <Text fontWeight={600}>Feltöltve: </Text>
                    <Text>{new Date(image.createdAt).toLocaleString("HU-hu")}</Text>
                </Box>
            </Fragment>
        </Stack>
    )
}