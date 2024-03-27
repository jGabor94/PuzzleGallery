"use client";


import useConfig from "@/lib/hooks/useConfig";
import { RootTheme } from "@/lib/mui/themes";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { createContext, useMemo, useState } from "react";
import { SWRConfig } from "swr";

export const PaginationContext = createContext();
export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const NextAuthProvider = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export const SWRProvider = (props) => {
    return <SWRConfig {...props}>{props.children}</SWRConfig>;
};

export const PaginationProvider = ({ children }) => {

    const [page, setPage] = useState(1)

    return (
        <PaginationContext.Provider value={{ page, setPage }}>
            {children}
        </PaginationContext.Provider>
    )
}

export const RootThemeProvider = ({ children }) => {

    const userConfig = useConfig()

    const [mode, setMode] = useState(userConfig.theme)

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={RootTheme(mode)}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>

    )
}



