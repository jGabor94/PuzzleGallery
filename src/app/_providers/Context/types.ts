import { ThemeMode } from "@/lib/types/types";
import { Dispatch, SetStateAction } from "react";

export interface IPaginationContext {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
}

export interface IColorModeContext {
    toggleColorMode: () => void,
}

export interface IConfigContext {
    theme: ThemeMode,
}