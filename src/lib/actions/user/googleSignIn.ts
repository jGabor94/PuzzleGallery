"use server"

import { signIn } from "@/lib/services/authentication/auth"

const SA_googleSignIn = async () => {
    try {
        await signIn("google")
        return
    } catch (error: any) {
        throw error;
    }
}

export default SA_googleSignIn