import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config"
import { dbConnect } from "@/lib/database/dbConnect"
import { User } from "@/lib/database/models"
import { mongooseAdapter } from "@/lib/services/authentication/NextAuth_adapter"

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
            async authorize(credentials) {

                await dbConnect()
                const user = await User.findOne({ email: credentials.email })
                console.log({ user })
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
        jwt: async ({ token, user, account, profile, trigger, session }) => {

            let userData = user


            if (trigger === "update") {
                await dbConnect()
                userData = await User.findOne({ _id: token._id })
                console.log({ userData })

            }

            if (userData) return { ...token, _id: userData._id, username: userData.username, roles: userData.roles, config: userData.config, image: profile ? profile.picture : token.image }
            return token
        },
        session: async ({ session, token }) => {
            return { ...session, user: { ...session.user, _id: token._id, username: token.username, roles: token.roles, config: token.configId, image: token.image } }
        },

    },
})
