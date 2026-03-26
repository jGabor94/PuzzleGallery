import { Alert, Snackbar } from "@mui/material";
import { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";

export interface SnackbarAlertData {
    severity: "error" | "info" | "success" | "warning",
    content: any
}

const SnackbarAlert: FC<{ alert: SnackbarAlertData | null, setAlert: Dispatch<SetStateAction<SnackbarAlertData | null>>, autoHideDuration?: number }> = ({ alert, setAlert, autoHideDuration }) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(null);
    };


    return (
        <Snackbar
            open={alert ? true : false}
            autoHideDuration={autoHideDuration || 6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={alert?.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alert?.content}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert