"use client"

import { Button, ButtonProps } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FC } from "react";

const UploadButton: FC<ButtonProps> = (props) => {
    return (<Button color="primary" aria-label="add" variant="contained" {...props} sx={{ gap: 1, ...props.sx }}>
        <CloudUploadIcon />
        Feltöltés
    </Button>)
}

export default UploadButton