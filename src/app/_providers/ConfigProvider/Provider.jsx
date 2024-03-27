"use client"

import { createContext, useState } from "react";

export const ConfigContext = createContext();

export default function Provider({ children, config }) {

    const [currency, setCurrency] = useState(config ? config.currency : "USD");


    return (
        <ConfigContext.Provider value={{ currency, setCurrency, theme: config ? config.theme : "light" }}>
            {children}
        </ConfigContext.Provider>
    );
};