import { createContext } from "react";
import { IColorModeContext, IConfigContext, IPaginationContext } from "./types";

export const PaginationContext = createContext<IPaginationContext>({} as IPaginationContext);
export const ColorModeContext = createContext<IColorModeContext>({} as IColorModeContext);
export const ConfigContext = createContext<IConfigContext>({} as IConfigContext);
