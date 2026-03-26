import { Mongoose_Image } from "@/lib/database/mongooseSchema";
import { Box, ImageListItem, ImageListItemBar } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

type ImageItemProps = {
    image: Mongoose_Image,
    onClick: () => void
    key: number
}

const ImageItem: FC<ImageItemProps> = ({ image, onClick }) => {

    return (
        <ImageListItem sx={{ cursor: "pointer" }} onClick={onClick}>
            <Box sx={{ aspectRatio: `1/${image.height / image.width}`, position: "relative" }}>
                <Image
                    fill
                    src={`${process.env.NEXT_PUBLIC_S3_STATIC_IMG_URL}${image.key}`}
                    alt={image.name}
                    placeholder="blur"
                    blurDataURL={image.blurDataUrl}
                    sizes="(max-width: 600px) 50vw, 33vw"
                />
            </Box>
            <ImageListItemBar title={image.name} />
        </ImageListItem>

    )
}

export default ImageItem