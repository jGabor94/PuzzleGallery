import { ProcessEnvOptions } from "child_process";
import { Email, ImageExtension } from "../types/types";

export const toPlainObject = <T>(object: T): T => JSON.parse(JSON.stringify(object))

export const generateRandomNumber = () => {
    const min: number = 1000000000;
    const max: number = 9999999999;

    const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

export const getMonogram = (string: string): string => {
    return string.split(" ").map(section => section.charAt(0)).join("")
}

export class ValidationErrors extends Error {
    messages: string | Array<string>;
    constructor(messages: string | Array<string>) {
        super()
        Object.setPrototypeOf(this, ValidationErrors.prototype);
        this.name = "validationErrors";
        this.messages = messages;
    }
}



export const extractUsername = (email: Email): string => email.split('@')[0]

/*
export const envLoader: {
    NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS: () => Array<ImageExtension>
} = {
    NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS: () => {
        return process.env.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS.split(",") as Array<ImageExtension> : []
    },

}

export const getImageExtensions = (): Array<ImageExtension> => {
    const imageExtensions = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS as Array<ImageExtension>
    if (typeof imageExtensions === "undefined") {
        throw new Error(`Please define the NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS environment variable inside .env.local`)
    }
    return imageExtensions.split(",")
}
*/

































