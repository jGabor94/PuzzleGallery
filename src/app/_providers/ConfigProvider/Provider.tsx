"use client"

import { UserConfig } from "@/lib/database/mongooseSchema";
import { FC, ReactNode } from "react";
import { ConfigContext } from "../Context/context";


const Provider: FC<{ children: ReactNode, config: UserConfig }> = ({ children, config }) => {

    return (
        <ConfigContext.Provider value={{ theme: config.theme }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default Provider