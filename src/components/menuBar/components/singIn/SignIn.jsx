"use client"

import { CustomInput, Paper1 } from "@/lib/mui/styled";
import SA_credentialsSignIn from "@/lib/services/authentication/credentialsSignIn";
import validateValues from "@/lib/services/validation/validateValues";
import { Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormAlert from "@/components/FormAlert";
import { loginFormSchema } from "@/lib/schema/joi/loginFormSchema";
import SA_googleSignIn from "@/lib/actions/user/googleSignIn";
import GoogleSignInButton from "./components/GoogleSignInButton";

export default function SignIn({ initAlert }) {

    const searchParams = useSearchParams()

    const queryError = searchParams.get("error")
    const queryMessage = searchParams.get("message")

    const [alert, setAlert] = useState(
        queryError && { severity: "error", content: queryError } ||
        queryMessage && { severity: "success", content: queryMessage } ||
        initAlert
    )

    const router = useRouter()

    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        formik.resetForm()
        setAlert(initAlert)
        setOpen(false)
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        initialErrors: {
            email: true,
            password: true
        },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)

            const res = await SA_credentialsSignIn(values)

            if (res.status.code !== 200) {
                setAlert({ severity: "error", content: res.error })
                actions.setSubmitting(false)
                return
            }
            router.refresh()

            handleClose()


        },
        validate: (values) => validateValues(loginFormSchema, values, { abortEarly: false })
    });



    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Belépés</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={formik.handleSubmit}>
                    <Paper1 sx={{
                        boxShadow: 10,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        maxWidth: "95%",
                    }}>
                        <Stack alignItems="center" justifyContent="center" sx={{ width: "100%", height: 80, backgroundColor: "#46366b" }} >
                            <Typography sx={{ color: "white", fontSize: 30, fontWeight: "bold" }}>Belépés</Typography>
                        </Stack>

                        <Stack gap={3} p={5} >
                            <FormAlert alert={alert} />
                            <CustomInput id="email" label='E-mail' name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <CustomInput id="password" label="Jelszó" name="password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <Button type="submit" variant="contained" sx={{ backgroundColor: "#46366b", borderRadius: 2, fontWeight: "bold" }} disabled={Boolean(formik.errors.email) || Boolean(formik.errors.password) || formik.isSubmitting}  >Bejelentkezés</Button>
                            <Divider flexItem>Vagy</Divider>
                            <GoogleSignInButton onClick={async () => await SA_googleSignIn()} />
                        </Stack>

                    </Paper1>
                </form>
            </Modal>
        </div>

    )

}