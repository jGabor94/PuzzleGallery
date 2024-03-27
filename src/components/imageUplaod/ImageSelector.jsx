"use client"

import NextImage from 'next/image'
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OutlinedInput } from '@mui/material';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import AddImageButton from './AddImageButton';
import validateImageLite from '@/lib/services/validation/validaImageLite';

export default function ImageSelector({ onChange, validation, value: images, onRemove, onNameChange, onError }) {


    const handleAdd = async (e) => {

        const { images: newImages, errors } = Array.from(e.target.files).reverse().reduce((acc, file) => {

            try {
                validateImageLite(file, validation)
                return {
                    ...acc, images: [...acc.images, {
                        previewUrl: URL.createObjectURL(file),
                        name: file.name.split(".")[0],
                        file
                    }]
                }
            } catch (error) {
                if (error.name === "validationErrors") {
                    return { ...acc, errors: [...new Set([...acc.errors, ...error.messages])] }
                } else {
                    return acc
                }
            }
        }, { images: [], errors: [] });

        onChange([...images, ...newImages])
        onError(errors)

    }
    const handleRemove = async (index) => {
        onRemove(index)
    }

    const onInpuChange = ({ target }) => {
        const index = target.attributes.index.value
        onNameChange(index, target.value)
    }


    return (
        <Box sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
            },
            width: "100%",

        }} >
            <PhotoProvider>

                {images.map((image, index) => (
                    <Stack gap={1} key={index} >
                        <Badge badgeContent={<ClearIcon sx={{ color: "rgb(161, 161, 161)", backgroundColor: "rgb(58, 58, 58)", borderRadius: "100%", cursor: "pointer" }} onClick={() => handleRemove(index)} />} overlap="circular">
                            <Box sx={{ aspectRatio: "1 / 1", width: "100%", position: "relative", cursor: "pointer" }} >
                                <PhotoView key={index} src={image.previewUrl}>
                                    <NextImage src={image.previewUrl} alt="" fill sizes='20vw' style={{ objectFit: "cover" }} />
                                </PhotoView>
                            </Box>
                        </Badge>
                        <OutlinedInput name="name" value={image.name} size="small" inputProps={{ index }} onChange={onInpuChange} />

                    </Stack>

                ))}
            </PhotoProvider>
            <Stack gap={1} sx={{ position: "relative" }}  >
                <Box sx={{ aspectRatio: "1 / 1", backgroundColor: "red", visibility: "hidden" }} />
                <OutlinedInput size="small" disabled={true} sx={{ visibility: "hidden" }} />
                <AddImageButton onChange={handleAdd} sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex", flexDirection: "column", gap: 1, cursor: "pointer", borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "rgb(99, 99, 99)", justifyContent: "center", alignItems: "center"
                }} component="label">
                    <AddPhotoAlternateIcon fontSize="large" />
                    <Typography fontSize={10} fontWeight={600}>Hozzáadás</Typography>
                </AddImageButton>

            </Stack>

        </Box>



    )
}