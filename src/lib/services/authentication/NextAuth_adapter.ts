import { extractUsername, toPlainObject } from "@/lib/assets/assets";
import { dbConnect } from "@/lib/database/dbConnect";
import { Account, User } from "@/lib/database/models";
import mongoose from "mongoose";
import type { Adapter } from "next-auth/adapters"
import { Email } from "@/lib/types/types";
import { Mongoose_User } from "@/lib/database/mongooseSchema";

export const mongooseAdapter: Adapter = {
    async createUser(user) {
        const username = extractUsername(user.email as Email)
        await dbConnect()

        const newUser = await User.create({
            username,
            email: user.email,
            name: user.name,
            roles: ["user", username]
        })
        return newUser as Mongoose_User
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
    async linkAccount(account) {
        await dbConnect()
        await Account.create(account)
        return account
    },
    async getUserByAccount({ providerAccountId, provider }) {

        await dbConnect()

        const account = await Account.findOne({ provider, providerAccountId })

        if (!account) return null;
        const user = await User.findById(new mongoose.mongo.ObjectId(account.userId));

        return user
    }
}