"use server"

import { auth } from "@/lib/services/authentication/auth";
import Provider from "./Provider";
import { toPlainObject } from "@/lib/assets/assets";
import { User } from "@/lib/database/models";
import { dbConnect } from "@/lib/database/dbConnect";

export default async function ConfigProvider({ children }) {

    const session = await auth()

    let userConfig = null

    if (session) {

        await dbConnect()

        const user = await User.findOne({ _id: session.user._id }).populate("config")
        userConfig = user.config

    }

    return (
        <Provider config={toPlainObject(userConfig)} >
            {children}
        </Provider>
    )
}


