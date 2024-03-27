'use client'

import { useState, Fragment } from 'react';
import Stack from '@mui/material/Stack';
import { Box, Button, LinearProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import ImageSelector from './ImageSelector';
import { serialize } from 'object-to-formdata';
import SA_UploadImages from '@/lib/actions/image/uploadImages';
import useImageList from '@/lib/hooks/useImageList';
import UploadButton from './UploadButton';
import FormAlert from '../FormAlert';
import SnackbarAlert from '../SnackbarAlert';
import { useRouter } from 'next/navigation';
import { envLoader } from '@/lib/assets/assets';
import imagePreparation from '@/lib/assets/imagePreparation';

export default function ImageUpload() {

    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [snackBarAlert, setSnackBarAlert] = useState(false)


    const { mutate } = useImageList()
    const router = useRouter()

    const formik = useFormik({
        initialValues: { images: [] },
        validateOnChange: false,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)

            const preparedImages = await imagePreparation(values.images)
            const formData = serialize({ images: preparedImages }, { indices: true })

            const res = await SA_UploadImages(formData)

            if (res.status.code === 200) {
                mutate()
                router.refresh()
                handleClose()
                setSnackBarAlert({ severity: "success", content: "Feltöltés sikeres" })
            } else {
                setAlert({ severity: "error", content: res.error })
            }

            actions.setSubmitting(false)

        },
    });

    const handleImageChange = (imageList) => {
        formik.setFieldValue("images", imageList)
    }

    const handleImageRemove = async (index) => {
        const images = [...formik.values.images]
        images.splice(index, 1)
        formik.setFieldValue("images", images)
    }

    const handleImageNameChange = (index, newValue) => {
        const images = [...formik.values.images]
        images[index].name = newValue
        formik.setFieldValue("images", images)
    }

    const handleError = (errors) => {
        setAlert(errors.length > 0 ? { severity: "error", content: errors } : false)
    }


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        formik.resetForm()
        setAlert(false)
        setOpen(false)
    }

    return (

        <Fragment>
            <UploadButton onClick={handleOpen} />
            <SnackbarAlert {...{ alert: snackBarAlert, setAlert: setSnackBarAlert }} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <form onSubmit={formik.handleSubmit}>

                    <Box sx={{
                        boxShadow: 10,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: "background.paper",
                        width: 700,
                        maxWidth: "90%",
                    }}>
                        <Stack sx={{
                            position: "relative", overflowY: "scroll", p: 3,
                            gap: 3,
                            maxHeight: 700,
                        }}>
                            {formik.isSubmitting && <LinearProgress sx={{ position: "fixed", width: "100%", top: 0, left: 0, zIndex: 1000 }} />}

                            <ImageSelector
                                onChange={handleImageChange}
                                onRemove={handleImageRemove}
                                onNameChange={handleImageNameChange}
                                onError={handleError}
                                value={formik.values.images}
                                validation={{ extensions: envLoader.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS() }} />

                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" gap={2}>
                                {alert && (<FormAlert {...{ alert, sx: { flexGrow: 1 } }} />)}
                                <Stack direction="row" gap={1}>
                                    <Button variant="outlined" onClick={handleClose}  >
                                        Mégse
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={formik.values.images.length < 1 || formik.isSubmitting}>Mentés</Button>
                                </Stack>
                            </Stack>

                        </Stack>




                    </Box>
                </form>

            </Modal>

        </Fragment >
    )
}