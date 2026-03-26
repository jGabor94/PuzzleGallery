import { Types } from "mongoose"
import NextAuth from "next-auth"
import { Mongoose_User, UserConfig } from "../database/mongooseSchema"
import { JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession, type User } from "next-auth";
import type { AdapterSession } from "next-auth/adapters";

interface TokenUserData {
    _id: string,
    username: string,
    roles: any[],
    image: string,
    email: string,
    name: string,
}


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: TokenUserData & DefaultSession["user"]
    }

    interface User extends TokenUserData { }

    interface AdapterUser extends Mongoose_User { }


}

declare module "next-auth/adapters" {
    interface AdapterUser extends Mongoose_User { }



}

declare module "next-auth/core" {
    interface AdapterUser extends Mongoose_User { }



}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userData?: TokenUserData
    }
}

