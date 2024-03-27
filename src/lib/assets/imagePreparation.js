import imageCompression from 'browser-image-compression';

const imagePreparation = async (images) => {
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