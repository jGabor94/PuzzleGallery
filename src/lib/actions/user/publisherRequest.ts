"use server"

import { makeServerAction } from "@/lib/assets/serverAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"
import { unstable_update } from "@/lib/services/authentication/auth"
import bcrypt from "bcrypt";
import { Session } from "next-auth"

interface Request {
    params: [code: string],
    session: Session
}

const SA_PublisherRequest = makeServerAction(isLogged, async ({ params, session }: Request) => {

    const [code] = params

    if (bcrypt.compareSync(code, process.env.PUBLISHER_HASH as string)) {

        await dbConnect()
        await User.updateOne({ _id: session.user._id }, { $addToSet: { roles: "publisher" } })
        await unstable_update({ ...session, user: { ...session.user, roles: [...session.user.roles, "publisher"] } })
        return createServerActionResponse({ status: 200 })
    }
    return createServerActionResponse({ status: 400, error: "Hibás kód" })

})

export default SA_PublisherRequest