'use client'

import { createTheme } from "@mui/material/styles"
import { NotoSans } from "./fonts"
import { ThemeMode } from "../types/types";

export const RootTheme = (mode: ThemeMode) => createTheme({
    typography: {
        fontFamily: NotoSans.style.fontFamily,
    },
    palette: {
        mode,
        ...(mode === "light" ? {
            primary: {
                main: "#46366b",
                light: "#6B63A3",
                dark: "#2f2750",
                contrastText: '#F3F3F3'
            },
            background: {
                paper: "#FFFFFF",
                default: "#f7f7f7"
            }
        } : {
            primary: {
                main: "#6a5797",
                light: "#7a6dcf",
                dark: "#483a81",
                contrastText: '#F3F3F3'
            },
            background: {
                paper: "#2c2c2c",
                default: "#262626"
            }
        })

    },
    components: {

        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    textTransform: "capitalize",
                    borderRadius: theme.spacing(1),
                    fontSize: 12,
                    fontFamily: NotoSans.style.fontFamily,
                    fontWeight: 600
                })
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary
                })
            }
        },

    },

});
