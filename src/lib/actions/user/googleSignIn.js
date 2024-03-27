"use server"

import { signIn } from "@/lib/services/authentication/auth"

const SA_googleSignIn = async (values) => {
    try {
        await signIn("google")
        return
    } catch (error) {
        if (error.message.includes('CredentialsSignin')) {
            return 'Hibás felhasználónév vagy jelszó'
        }
        throw error;
    }
}

export default SA_googleSignIn