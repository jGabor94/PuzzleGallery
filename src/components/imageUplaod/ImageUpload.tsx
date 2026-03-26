'use client'

import SA_UploadImages from '@/lib/actions/image/uploadImages';
import imagePreparation from '@/lib/assets/imagePreparation';
import { allowedImageExtenstions } from '@/lib/data/data';
import useImageList from '@/lib/hooks/useImageList';
import { Box, Button, LinearProgress, Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { serialize } from 'object-to-formdata';
import { FC, Fragment, useState } from 'react';
import FormAlert, { FormAlertData } from '../FormAlert';
import SnackbarAlert, { SnackbarAlertData } from '../SnackbarAlert';
import ImageSelector, { RawImageList } from './ImageSelector';
import UploadButton from './UploadButton';

const ImageUpload: FC<{}> = () => {

    const [open, setOpen] = useState(false)
    const [formAlert, setFormAlert] = useState<null | FormAlertData>(null)
    const [snackBarAlert, setSnackBarAlert] = useState<null | SnackbarAlertData>(null)


    const { mutate } = useImageList()
    const router = useRouter()

    const formikInitValues: { images: RawImageList } = { images: [] }

    const formik = useFormik({
        initialValues: formikInitValues,
        validateOnChange: false,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)

            const preparedImages = await imagePreparation(values.images)
            const formData = serialize({ images: preparedImages }, { indices: true })

            const res = await SA_UploadImages(formData)

            if (res.statusCode === 200) {
                mutate()
                router.refresh()
                handleClose()
                setSnackBarAlert({ severity: "success", content: "Feltöltés sikeres" })
            } else {
                setFormAlert({ severity: "error", content: res.error })
            }

            actions.setSubmitting(false)

        },
    });

    const handleImageChange = (imageList: RawImageList) => {
        formik.setFieldValue("images", imageList)
    }

    const handleImageRemove = async (index: number) => {
        const images = [...formik.values.images]
        images.splice(index, 1)
        formik.setFieldValue("images", images)
    }

    const handleImageNameChange = (index: number, newValue: string) => {
        const images = [...formik.values.images]
        images[index].name = newValue
        formik.setFieldValue("images", images)
    }

    const handleError = (errors: string[]) => {
        setFormAlert(errors.length > 0 ? { severity: "error", content: errors } : null)
    }


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        formik.resetForm()
        setFormAlert(null)
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
                                validation={{ extensions: allowedImageExtenstions }} />

                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" gap={2}>
                                {formAlert && (<FormAlert {...{ alertData: formAlert, sx: { flexGrow: 1 } }} />)}
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

export default ImageUpload