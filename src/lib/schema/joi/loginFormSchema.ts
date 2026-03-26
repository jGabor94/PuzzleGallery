import * as Joi from "joi";
import { errorMsgTemplate } from "./errorMsgTemplate";
import { Credentials } from "@/lib/services/authentication/types";


export const loginFormSchema = Joi.object<Credentials>({
    email: Joi.string().email({ tlds: { allow: false } }).label("E-mail"),
    password: Joi.string().min(8).label("Jelszó"),
}).options({ messages: errorMsgTemplate })