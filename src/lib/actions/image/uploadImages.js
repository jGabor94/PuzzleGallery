"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"
import { isLogged, toFileList } from "@/lib/middlewares/ServerAction-Middlewares"
import { uploadImages } from "../../services/imageServices"
import { aclMiddlewares } from "../../services/authorization/aclAuthorization"
import { imageAcl } from "../../services/authorization/acl"
import { envLoader } from "../../assets/assets"

const SA_UploadImages = makeServerAction(isLogged, aclMiddlewares.serverAction(imageAcl, "create"), toFileList, async ({ formData }) => {

    try {
        const result = await uploadImages(formData, process.env.S3_IMG_SUBFOLDER, {
            validation: {
                size: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_SIZE,
                extensions: envLoader.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS()
            }
        })

        await dbConnect()
        const insertedResult = await Image.insertMany(result)
        return createServerActionResponse({ status: 200, payload: insertedResult })

    } catch (error) {
        if (error.name === "validationErrors") return createServerActionResponse({ status: 400, error: error.messages })
        throw error
    }



})

export default SA_UploadImages