"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"

const SA_ConfigUpdate = makeServerAction(isLogged, async ({ params, session }) => {

    const [query] = params

    await dbConnect()

    await User.updateOne({ _id: session.user._id }, { config: query })

    return createServerActionResponse({ status: 200 })
})

export default SA_ConfigUpdate