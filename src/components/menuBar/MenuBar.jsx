import { auth } from "@/lib/services/authentication/auth"
import SignIn from "./components/singIn/SignIn";
import { Box, Divider, Stack, Typography } from "@mui/material"
import DiamondIcon from '@mui/icons-material/Diamond';
import ProfileMenu from "./components/ProfileMenu";
import ImageUpload from "../imageUplaod/ImageUpload";
import { imageAcl } from "@/lib/services/authorization/acl";
import { aclCheck } from "@/lib/services/authorization/aclAuthorization";

export default async function MenuBar({ height }) {

    const session = await auth()

    return (
        <Box sx={{ height, zIndex: 2000 }} mb={2} >
            <Box direction="row" sx={{
                zIndex: 2000,
                height,
                borderBottomStyle: "solid",
                borderBottomWidth: "2px",
                borderBottomColor: "primary.main",
                backgroundColor: "background.default",
                width: "100%",
                position: "fixed",
                pr: 3,
                pl: 3
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height, width: 1000, maxWidth: "100%", margin: "0 auto" }}>
                    <Stack direction="row" gap={1} alignItems="center">
                        <DiamondIcon color="primary" sx={{ fontSize: 40 }} />
                        <Typography sx={{ fontSize: 20, fontWeight: 700, display: { xs: "none", sm: "block" } }}>
                            Gyöngykirakó galléria
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2}>
                        {!session ? (
                            <SignIn />
                        ) : (
                            <Stack direction="row" gap={2} alignItems="center">
                                {session && aclCheck(imageAcl, "write", session.user.roles) && (<ImageUpload />)}
                                <Divider orientation="vertical" flexItem />
                                <ProfileMenu {...{ session }} />
                            </Stack>

                        )}
                    </Stack>
                </Stack>


            </Box>
        </Box>

    )
}