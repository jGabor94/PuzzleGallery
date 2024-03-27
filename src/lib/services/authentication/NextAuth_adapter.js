import { extractUsername, toPlainObject } from "@/lib/assets/assets";
import { dbConnect } from "@/lib/database/dbConnect";
import { Account, User } from "@/lib/database/models";
import mongoose from "mongoose";

export const mongooseAdapter = {
    async createUser(user) {
        const username = extractUsername(user.email)

        console.log({ user })

        await dbConnect()

        const newUser = await User.create({
            username,
            email: user.email,
            name: user.name,
            roles: ["user", username]
        })

        console.log({ newUser })

        return newUser
    },
    async getUser(id) {
        await dbConnect()
        const user = await User.findById(id);
        return user;
    },
    async getUserByEmail(email) {
        await dbConnect()
        const user = await User.findOne({ email }).select({ password: 0 })
        return toPlainObject(user)
    },
    async updateUser(user) {
        console.log({ user })
        return
    },
    async linkAccount(account) {
        await dbConnect()
        await Account.create(account)
        return account
    },

    async createVerificationToken({ identifier, expires, token }) {
        return
    },
    async useVerificationToken({ identifier, token }) {
        return
    },
    async getUserByAccount({ providerAccountId, provider }) {

        await dbConnect()

        const account = await Account.findOne({ provider, providerAccountId })

        if (!account) return null;
        const user = await User.findById(new mongoose.mongo.ObjectId(account.userId));

        return user
    }
}