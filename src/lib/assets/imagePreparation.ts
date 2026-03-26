import imageCompression from 'browser-image-compression';

interface Image {
    previewUrl: string,
    file: File,
    name: string
}

export type ImageList = Array<{
    file: File,
    name: string,
    width: number,
    height: number
}>

const imagePreparation = async (images: Image[]): Promise<ImageList> => {
    return await Promise.all(images.map(({ previewUrl, file, name }) => {
        return (async () => {
            const compressedImage = await imageCompression(file, {
                maxSizeMB: 3,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            })

            const loadedImage = await imageCompression.loadImage(previewUrl)
            return {
                file: compressedImage,
                name,
                width: loadedImage.width,
                height: loadedImage.height,
            }
        })()
    }))
}


export default imagePreparation