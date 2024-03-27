import { S3Client, PutObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { S3ClientCfg, imageList, imageUploadConfig, uplaodedImageObject } from '../types/types';
import validateImage from './validation/validateImage';
import { getPlaiceholder } from "plaiceholder";

/**
 * Ez a függvény feltölti a függvénynek megadott képeket a környezeti változóban eltárolt AWS S3 tárolóba.
 * A függvény ellenőrzi hogy a fájl kép típus-e és felöltésre kerül a megadott vödör images mappájába
 * Az images mappán további almappa adható meg a 2. argumentumban.
 * A függvénynek a config objektumon keresztül további validációs kritériumokat lehet biztosítani.
 * @returns feltöltött képek images mappán belüli relatív útvonala tömbben
 */




export const uploadImages = async (imageList: imageList, subfolder?: string, cfg?: imageUploadConfig): Promise<Array<uplaodedImageObject>> => {

    const s3 = new S3Client(S3ClientCfg);

    const promises = imageList.map(({ file, ...imageData }) => (async () => {

        const bufferData: ArrayBuffer = await file.arrayBuffer()
        const { base64: blurDataUrl } = await getPlaiceholder(Buffer.from(bufferData))

        await validateImage(bufferData, cfg?.validation)

        return { ...imageData, blurDataUrl, file, bufferData }
    })()
    )

    const datas = await Promise.all([...promises])

    const uploads = datas.map(({ bufferData, file, ...imageData }) => (async () => {
        const id = uuid()
        let key = `images${subfolder}/${id}`
        await s3.send(new PutObjectCommand({
            Body: bufferData as Buffer,
            Bucket: process.env.S3_IMGBUCKETNAME as string,
            Key: key,
            ContentType: file.type,
            ACL: 'public-read'
        }))
        return { ...imageData, key: `${subfolder}/${id}` }
    })()
    )

    return Promise.all(uploads)

}

export const deleteImages = async (imageid: Array<string>) => {
    const s3 = new S3Client(S3ClientCfg);
    const command1 = new DeleteObjectsCommand({
        Bucket: process.env.S3_IMGBUCKETNAME as string,
        Delete: {
            Objects: imageid.map((key) => ({ Key: `images${key}` }))
        }
    })

    await s3.send(command1)

    return
}

