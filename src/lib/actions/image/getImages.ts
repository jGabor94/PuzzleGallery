"use server"

import { makeServerAction } from "@/lib/assets/serverAction"
import { createServerActionResponse } from "@/lib/assets/serverAction/response"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"
import { isLogged } from "@/lib/middlewares/ServerAction-Middlewares"

interface Request {
    params: [page: number]
}

const SA_GetImages = makeServerAction(async ({ params }: Request) => {
    const [page] = params
    const limit = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string)

    await dbConnect()

    const res = await Image.find().sort({ _id: -1 }).limit(limit).skip(limit * (page - 1))

    const response = createServerActionResponse({ payload: res })

    return response
})



export default SA_GetImages
