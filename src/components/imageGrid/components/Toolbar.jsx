import SA_DeleteImage from "@/lib/actions/image/deleteImage"
import { LinearProgress, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSession } from "next-auth/react";
import { imageAcl } from "@/lib/services/authorization/acl";
import { aclCheck } from "@/lib/services/authorization/aclAuthorization";
import useImageList from "@/lib/hooks/useImageList";
import { useState } from "react";

export default function Tooldbar({ index, images, onIndexChange }) {


    const [progress, setProgress] = useState(false)

    const router = useRouter()
    const { data: session } = useSession()

    const { mutate: mutateImageList } = useImageList()

    const handleDelete = async () => {
        setProgress(true)
        const res = await SA_DeleteImage(images[index].key)
        if (res.status.code === 200) {
            if (index === images.length - 1) onIndexChange(index - 1)
            mutateImageList()
            router.refresh()
        }

        setProgress(false)
    }

    const toggleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            const element = document.querySelector('.PhotoView-Portal');
            if (element) {
                element.requestFullscreen();
            }
        }
    }


    return (
        <Stack direction="row" alignItems="center" gap={1}>
            {progress && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, width: "100%" }} />}
            {session && aclCheck(imageAcl, "delete", session.user.roles) && (
                <DeleteOutlineIcon sx={{ opacity: ".75", cursor: "pointer", "&:hover": { opacity: 1 } }} onClick={handleDelete} />
            )}
            <FullscreenIcon sx={{ opacity: ".75", cursor: "pointer", "&:hover": { opacity: 1 } }} onClick={toggleFullScreen} />
        </Stack>

    )
}