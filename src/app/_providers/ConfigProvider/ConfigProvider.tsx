"use server"

import { auth } from "@/lib/services/authentication/auth";
import Provider from "./Provider";
import { toPlainObject } from "@/lib/assets/assets";
import { User } from "@/lib/database/models";
import { dbConnect } from "@/lib/database/dbConnect";
import React, { FC, ReactNode } from "react";
import { Mongoose_User, UserConfig } from "@/lib/database/mongooseSchema";



const ConfigProvider: FC<{ children: ReactNode }> = async ({ children }) => {

    const session = await auth()

    let config: UserConfig = { theme: "light" }

    if (session) {

        await dbConnect()
        const user = await User.findOne({ _id: session.user._id }).populate("config")
        if (user) config = user.config
    }

    return (
        <Provider config={toPlainObject(config)} >
            {children}
        </Provider>
    )
}

export default ConfigProvider

