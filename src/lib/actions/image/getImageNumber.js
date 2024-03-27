"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"

const SA_GetImageNumber = makeServerAction(async () => {
    await dbConnect()
    const number = await Image.countDocuments()
    return createServerActionResponse({ status: 200, payload: number })
})

export default SA_GetImageNumber