import mongoose, { Model } from 'mongoose';
import { Mongoose_Account, Mongoose_Image, Mongoose_User, accountSchema, imageSchema, userSchema } from './mongooseSchema';


export const User: Model<Mongoose_User> = mongoose.models.User || mongoose.model<Mongoose_User>('User', userSchema)
export const Account: Model<Mongoose_Account> = mongoose.models.Account || mongoose.model<Mongoose_Account>('Account', accountSchema)
export const Image: Model<Mongoose_Image> = mongoose.models.Image || mongoose.model('Image', imageSchema)


