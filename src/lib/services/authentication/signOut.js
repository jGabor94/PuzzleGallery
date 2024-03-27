"use server"

import { signOut } from "./auth"


const SA_signOut = async () => {
    await signOut({ redirectTo: "/" })
}

export default SA_signOut