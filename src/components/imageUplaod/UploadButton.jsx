"use client"

import { Button } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadButton(props) {

    return (<Button color="primary" aria-label="add" variant="contained" {...props} sx={{ gap: 1, ...props.sx }}>
        <CloudUploadIcon />
        Feltöltés
    </Button>)
}