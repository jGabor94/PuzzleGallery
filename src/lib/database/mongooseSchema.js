import { mongoose } from 'mongoose';

export const userSchema = new mongoose.Schema({
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



export const accountSchema = new mongoose.Schema({
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

export const imageSchema = new mongoose.Schema({
    key: String,
    name: String,
    width: Number,
    height: Number,
    blurDataUrl: String,
}, { timestamps: true })


