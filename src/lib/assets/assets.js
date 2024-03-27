export const toPlainObject = (object) => JSON.parse(JSON.stringify(object))

export const generateRandomNumber = () => {
    const min = 1000000000;
    const max = 9999999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

export const getMonogram = (string) => {
    return string.split(" ").map(section => section.charAt(0)).join("")
}

export class validationErrors {
    constructor(messages) {
        this.name = "validationErrors";
        this.messages = messages;
    }
}

export const extractUsername = (email) => email.split('@')[0]


export const envLoader = {
    NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS: () => {
        return process.env.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS.split(",") : []
    },

}