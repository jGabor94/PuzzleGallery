"use server"

import { makeServerAction } from "@/lib/assets/serverAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"

const SA_GetImageNumber = makeServerAction(async () => {
    await dbConnect()
    const number: number = await Image.countDocuments()
    return createServerActionResponse({ status: 200, payload: number })
})


export default SA_GetImageNumber