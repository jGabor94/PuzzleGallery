import { Alert, AlertTitle } from "@mui/material"

export default function FormAlert({ alert, ...rest }) {

    if (alert && Array.isArray(alert.content)) return (
        <Alert severity={alert.severity} {...rest} >
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            <ul>
                {alert.content.map((content, key) => (
                    <li key={key}>
                        {content}
                    </li>
                ))}
            </ul>
        </Alert>
    )


    if (alert) return (
        <Alert severity={alert.severity} {...rest}  >
            <AlertTitle>{alert?.title ? alert.title : ""}</AlertTitle>
            {alert.content}
        </Alert>
    )


}