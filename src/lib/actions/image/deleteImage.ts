"use server"

import { makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"
import { deleteImages } from "../../services/imageServices"
import { isLogged } from "../../middlewares/ServerAction-Middlewares"
import { aclMiddlewares } from "../../services/authorization/aclAuthorization"
import { imageAcl } from "../../services/authorization/acl"
import { createServerActionResponse } from "@/lib/assets/serverAction/response"

interface Request {
    params: [key: string]
}

const SA_DeleteImage = makeServerAction(isLogged, aclMiddlewares.serverAction(imageAcl, "delete"), async ({ params }: Request) => {

    const [key] = params

    await dbConnect()

    await Image.deleteOne({ key })
    await deleteImages([key])

    return createServerActionResponse()
})


export default SA_DeleteImage