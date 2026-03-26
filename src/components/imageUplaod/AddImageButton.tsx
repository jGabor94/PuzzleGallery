"use client"

import { Button, ButtonProps } from "@mui/material"
import { ChangeEventHandler, FC } from "react"


interface Props extends Omit<ButtonProps, "onChange"> {
    onChange: ChangeEventHandler<HTMLInputElement>
}

const AddImageButton: FC<Props> = ({ onChange, ...buttonProps }) => {

    return (
        <Button {...buttonProps} component={"label" as any}>
            {buttonProps.children}
            <input hidden id="image" accept="image/*" multiple type="file" onChange={onChange} />
        </Button>
    )
}

export default AddImageButton