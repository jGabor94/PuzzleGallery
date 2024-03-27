"use client"

import FormAlert from "@/components/FormAlert";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SA_PublisherRequest from "@/lib/actions/user/publisherRequest";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PublisherRequest() {

    const { data: session, update: updateSesssion } = useSession()
    const [alert, setAlert] = useState(false)

    const router = useRouter()

    const formik = useFormik({
        initialValues: { code: '' },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)

            const res = await SA_PublisherRequest(values.code)

            if (res.status.code === 200) {
                formik.setStatus("success")
                updateSesssion()
                router.refresh()
            } else {
                setAlert({ severity: "error", content: res.error })
            }

            actions.setSubmitting(false)

        },
    });


    if (formik.status === "success") return (
        <Stack alignItems="center" sx={{ height: "100%" }} pt={2}>
            <Stack alignItems="center">
                <Stack direction="row" gap={1}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography>Kérés sikeres</Typography>
                </Stack>
                <Typography sx={{ fontSize: 14 }}>Mostantól közzétehetsz tartalmat az oldalon</Typography>
            </Stack>

        </Stack>
    )


    if (session.user.roles.includes("publisher") || session.user.roles.includes("admin")) return (
        <Stack alignItems="center" sx={{ height: "100%" }} pt={2}>
            <Stack alignItems="center">
                <Stack direction="row" gap={1}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography>Már minden jogosultságot megszereztél</Typography>
                </Stack>
            </Stack>

        </Stack>
    )

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack gap={2}>
                <FormAlert {...{ alert: { severity: "warning", content: "Ezzel a kóddal jogosultságot kapsz az oldal tartalmának módosítására. A kódot az alklamzás tulajdonosa biztosítja." } }} />
                <FormAlert {...{ alert }} />
                <TextField name="code" size="small" label="Kód" value={formik.values.code} onChange={formik.handleChange} />
                <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end" }} disabled={formik.isSubmitting}>Küldés</Button>
            </Stack>
        </form>

    )
}