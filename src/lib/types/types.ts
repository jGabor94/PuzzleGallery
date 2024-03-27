export type AnyObject = Record<string, any>;

export type ImageExtension = 'jpg' | 'jpeg' | 'png' | 'apng' | 'gif' | 'webp' | 'flif' | 'xcf' | 'cr2' | 'cr3' | 'orf' | 'arw' | 'dng' | 'nef' | 'rw2' | 'raf' | 'tif' | 'bmp' | 'icns' | 'jxr' | 'psd' | 'indd' | 'ico' | 'j2c' | 'jp2' | 'jpm' | 'jpx' | 'mj2' | 'heic' | 'avif' | 'jxl'


export interface imageValidationCfg {
    extensions?: Array<ImageExtension>,
    size?: number
}

export interface imageObject {
    name: string,
    file: File,
    width: Number,
    height: Number,
}

export interface uplaodedImageObject extends Omit<imageObject, "file"> {
    key: string,
    blurDataUrl: String
}

export type imageList = Array<imageObject>


export interface imageUploadConfig {
    validation?: imageValidationCfg
}



export interface S3ClientCfg {
    region: string,
    credentials: {
        accessKeyId: string,
        secretAccessKey: string
    }
}

export const S3ClientCfg: S3ClientCfg = {
    region: process.env.S3_REGION as string,
    credentials: {
        accessKeyId: process.env.S3_ACCESSKEYID as string,
        secretAccessKey: process.env.S3_SECRETACCESSKEY as string
    }
}