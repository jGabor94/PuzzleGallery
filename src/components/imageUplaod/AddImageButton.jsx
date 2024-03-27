"use client"

import { Button } from "@mui/material"

export default function AddImageButton(props) {

    const buttonProps = { ...props }
    delete buttonProps.onChange

    return (
        <Button {...buttonProps} component="label">
            {props.children}
            <input hidden id="image" accept="image/*" multiple type="file" onChange={(e) => props.onChange(e)} />
        </Button>
    )
}