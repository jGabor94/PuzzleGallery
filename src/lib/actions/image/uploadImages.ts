"use server"

import { makeServerAction } from "@/lib/assets/serverAction"
import { dbConnect } from "@/lib/database/dbConnect"
import { Image } from "@/lib/database/models"
import { isLogged, toFileList } from "@/lib/middlewares/ServerAction-Middlewares"
import { uploadImages } from "../../services/imageServices"
import { aclMiddlewares } from "../../services/authorization/aclAuthorization"
import { imageAcl } from "../../services/authorization/acl"
import { ValidationErrors } from "../../assets/assets"
import { allowedImageExtenstions } from "@/lib/data/data"
import { imageList } from "@/lib/types/types"
import { createServerActionResponse } from "@/lib/assets/serverAction/response"

interface Request {
    params: [images: FormData],
    formData: imageList
}

const SA_UploadImages = makeServerAction(isLogged, aclMiddlewares.serverAction(imageAcl, "create"), toFileList, async ({ formData }: Request) => {

    try {
        const result = await uploadImages(formData, process.env.S3_IMG_SUBFOLDER, {
            validation: {
                size: Number(process.env.NEXT_PUBLIC_ALLOWED_IMAGE_SIZE as string),
                extensions: allowedImageExtenstions
            }
        })

        await dbConnect()
        const insertedResult = await Image.insertMany(result)

        const res = createServerActionResponse({ payload: insertedResult })
        return res

    } catch (error) {
        console.log(error)
        if (error instanceof ValidationErrors) {
            const res = createServerActionResponse({ status: 400, error: error.messages })
            return res
        }
        throw error
    }

})

export default SA_UploadImages


