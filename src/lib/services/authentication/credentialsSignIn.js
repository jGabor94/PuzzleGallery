"use server"

import { createServerActionResponse } from "@/lib/assets/serverAction";
import { signIn } from "./auth";

const SA_credentialsSignIn = async (values) => {
    try {
        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password
        })

        return createServerActionResponse({ payload: { redirect: result } });

    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            return createServerActionResponse({ status: 401, error: 'Hibás felhasználónév vagy jelszó' })
        }
        return createServerActionResponse({ status: 500 })
    }
}


export default SA_credentialsSignIn
