"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { User, UserConfig } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { unstable_update } from "@/lib/services/authentication/auth"
import bcrypt from "bcrypt";


const SA_PublisherRequest = makeServerAction(isLogged, async ({ params, session }) => {

    const [code] = params

    if (bcrypt.compareSync(code, process.env.PUBLISHER_HASH)) {

        await dbConnect()
        await User.updateOne({ _id: session.user._id }, { $addToSet: { roles: "publisher" } })
        await unstable_update()
        return createServerActionResponse({ status: 200 })
    }
    return createServerActionResponse({ status: 400, error: "Hibás kód" })

})

export default SA_PublisherRequest