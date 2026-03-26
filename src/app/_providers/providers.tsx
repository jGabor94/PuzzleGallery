"use client";


import useConfig from "@/lib/hooks/useConfig";
import { RootTheme } from "@/lib/mui/themes";
import { ThemeMode } from "@/lib/types/types";
import { Color, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React, { Dispatch, FC, ReactNode, SetStateAction, createContext, useMemo, useState } from "react";
import { SWRConfig, SWRConfiguration } from "swr";
import { ColorModeContext, PaginationContext } from "./Context/context";


interface SWRProviderProps {
    value?: SWRConfiguration | ((parentConfig?: SWRConfiguration | undefined) => SWRConfiguration) | undefined;
    children: ReactNode
}

export const NextAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export const SWRProvider = ({ children, ...SWRConfigProps }: SWRProviderProps) => {
    return <SWRConfig {...SWRConfigProps}>{children}</SWRConfig>;
};

export const PaginationProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [page, setPage] = useState(1)

    return (
        <PaginationContext.Provider value={{ page, setPage }}>
            {children}
        </PaginationContext.Provider>
    )
}

export const RootThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const userConfig = useConfig()

    const [mode, setMode] = useState<ThemeMode>(userConfig.theme)

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



