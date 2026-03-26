import mongoose, { Schema, SchemaTimestampsConfig } from 'mongoose';
import { ThemeMode } from '../types/types';

export interface UserConfig {
    theme: ThemeMode,
}

export type Mongoose_User = {
    username: string,
    password: string,
    email: string,
    name: string,
    roles: any[],
    config: UserConfig,
    emailVerified: Date | null
} & SchemaTimestampsConfig

export type Mongoose_Account = {
    userId: string,
    type: string,
    provider: string,
    providerAccountId: string,
    refresh_token: string,
    access_token: string,
    expires_at: number,
    token_type: string,
    scope: string,
    id_token: string,
    session_state: string,
} & SchemaTimestampsConfig

export type Mongoose_Image = {
    key: string,
    name: string,
    width: number,
    height: number,
    blurDataUrl: string,
} & SchemaTimestampsConfig

export const userSchema: Schema = new mongoose.Schema<Mongoose_User>({
    username: String,
    password: { type: String, default: "" },
    email: String,
    name: { type: String, default: "" },
    active: { type: Boolean, default: true },
    roles: [],
    config: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
    },
}, { timestamps: true })



export const accountSchema = new mongoose.Schema<Mongoose_Account>({
    userId: String,
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
})

export const imageSchema = new mongoose.Schema<Mongoose_Image>({
    key: String,
    name: String,
    width: Number,
    height: Number,
    blurDataUrl: String,
}, { timestamps: true })


