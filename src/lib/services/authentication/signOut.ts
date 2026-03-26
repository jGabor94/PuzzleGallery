"use server"

import { createServerActionResponse, makeServerAction } from "@/lib/assets/serverAction"
import { signOut } from "./auth"

const SA_signOut = async () => {
    await signOut({ redirectTo: "/" })
    return
}

export default SA_signOut