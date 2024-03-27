"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"

const SA_GetImages = makeServerAction(async ({ params }) => {

    const [page] = params
    const limit = process.env.itemsPerPage

    await dbConnect()

    const res = await Image.find().sort({ _id: -1 }).limit(limit).skip(limit * (page - 1))

    return createServerActionResponse({ status: 200, payload: res })
})

export default SA_GetImages