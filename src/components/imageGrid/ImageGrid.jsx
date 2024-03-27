"use client"

import useImageList from "@/lib/hooks/useImageList"
import Masonry from "@mui/lab/Masonry"
import { useEffect, useState } from "react"
import { PhotoSlider } from "react-photo-view"
import Tooldbar from "./components/Toolbar"
import ImageItem from "./components/ImageItem"
import Overlay from "./components/Overlay"

export default function ImageGrid() {

    const [visibility, setVisibility] = useState(false)
    const { imageList } = useImageList()

    const [sliderOpen, setSliderOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleOpen = (index) => {
        setIndex(index)
        setSliderOpen(true)
    }

    const handleClose = () => {
        setSliderOpen(false)
    }

    useEffect(() => {
        setVisibility(true)
    }, [])

    useEffect(() => {
        if (imageList?.length === 0) setSliderOpen(false)
    }, [imageList])


    return visibility && imageList && (
        <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sx={{ width: 1000, maxWidth: "100%" }}>

            <PhotoSlider
                images={imageList.map(image => ({
                    src: `${process.env.NEXT_PUBLIC_S3_STATIC_IMG_URL}${image.key}`,
                    createdAt: image.createdAt,
                    name: image.name,
                    key: image.key
                }))}
                index={index}
                visible={sliderOpen}
                onClose={handleClose}
                onIndexChange={setIndex}
                overlayRender={(props) => <Overlay {...{ ...props }} />}
                toolbarRender={(props) => <Tooldbar {...{ ...props }} />}
            />
            {imageList && imageList.map((image, index) => (
                <ImageItem key={index} image={image} onClick={() => handleOpen(index)} />
            ))}
        </Masonry >
    )




}