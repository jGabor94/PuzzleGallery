import * as Joi from "joi";
import { errorMsgTemplate } from "./errorMsgTemplate";


export const loginFormSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).label("E-mail"),
    password: Joi.string().min(8).label("Jelszó"),
}).options({ messages: errorMsgTemplate })