import { Alert, AlertTitle } from "@mui/material"
import { FC } from "react"

export interface FormAlertData {
    severity: "error" | "info" | "success" | "warning",
    title?: string,
    content: string | Array<string>
}

const FormAlert: FC<{ alertData: FormAlertData | null }> = ({ alertData, ...rest }) => {

    if (alertData && Array.isArray(alertData.content)) return (
        <Alert severity={alertData.severity} {...rest} >
            {alertData.title && <AlertTitle>{alertData.title}</AlertTitle>}
            <ul>
                {alertData.content.map((content, key) => (
                    <li key={key}>
                        {content}
                    </li>
                ))}
            </ul>
        </Alert>
    )


    if (alertData) return (
        <Alert severity={alertData.severity} {...rest}  >
            <AlertTitle>{alertData?.title ? alertData.title : ""}</AlertTitle>
            {alertData.content}
        </Alert>
    )

}

export default FormAlert