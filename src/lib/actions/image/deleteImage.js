"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"
import { deleteImages } from "../../services/imageServices"
import { isLogged } from "../../middlewares/ServerAction-Middlewares"
import { aclMiddlewares } from "../../services/authorization/aclAuthorization"
import { imageAcl } from "../../services/authorization/acl"


const SA_DeleteImage = makeServerAction(isLogged, aclMiddlewares.serverAction(imageAcl, "delete"), async ({ params }) => {

    const [key] = params

    await dbConnect()

    await Image.deleteOne({ key })
    await deleteImages([key])

    return createServerActionResponse()
})

export default SA_DeleteImage