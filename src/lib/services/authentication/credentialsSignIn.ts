"use server"

import { makeServerAction } from "@/lib/assets/serverAction";
import { signIn } from "./auth";
import { Credentials } from "./types";
import { createServerActionResponse } from "@/lib/assets/serverAction/response";

interface Request {
    params: [credentials: Credentials]
}

const SA_credentialsSignIn = makeServerAction(async ({ params }: Request) => {

    const [credentials] = params

    try {
        const result = await signIn("credentials", {
            redirect: false,
            email: credentials.email,
            password: credentials.password
        })

        return createServerActionResponse({ payload: { redirect: result } });

    } catch (error: any) {
        if (error.type === 'CredentialsSignin') {
            return createServerActionResponse({ status: 401, error: 'Hibás felhasználónév vagy jelszó' })
        }
        throw error
    }
})


export default SA_credentialsSignIn
