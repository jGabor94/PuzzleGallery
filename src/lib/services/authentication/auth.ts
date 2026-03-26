import { dbConnect } from "@/lib/database/dbConnect";
import { User } from "@/lib/database/models";
import { mongooseAdapter } from "@/lib/services/authentication/NextAuth_adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";

export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update } = NextAuth({
    ...authConfig,
    adapter: mongooseAdapter,
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            async authorize(credentials: any) {

                await dbConnect()
                const user = await User.findOne({ email: credentials.email })
                if (!user || !bcrypt.compareSync(credentials.password, user.password) || !user.password) {
                    return null
                } else if (!user.active) {
                    return null
                } else {
                    return user
                }


            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user, profile, trigger, session }) => {

            let userData = user

            if (trigger === "update" && session) {
                //await dbConnect()
                //const user = await User.findOne({ _id: token._id })
                return { ...token, userData: { ...session.user } }
                //return { ...token, userData: { _id: user._id, username: user.username, roles: user.roles, image: profile ? profile.picture : token.image, email: user.email, name: user.name } }
            }
            if (userData) return { ...token, userData: { _id: userData._id, username: userData.username, roles: userData.roles, image: profile ? profile.picture : token.image, email: userData.email, name: userData.name } }
            return token
        },

        session: async ({ session, token }) => {
            return { ...session, user: { ...session.user, ...token.userData } }
        },

    },
})
