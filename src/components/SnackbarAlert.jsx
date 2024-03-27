import { Alert, Snackbar } from "@mui/material";

export default function SnackbarAlert({ alert, setAlert, autoHideDuration }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setAlert(false);
    };


    return (
        <Snackbar
            open={alert ? true : false}
            autoHideDuration={autoHideDuration || 6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={alert.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alert.content}
            </Alert>
        </Snackbar>
    )
}