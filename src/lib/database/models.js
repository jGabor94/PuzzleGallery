import { mongoose } from 'mongoose';
import { accountSchema, imageSchema, userSchema } from './mongooseSchema';

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Account = mongoose.models.Account || mongoose.model('Account', accountSchema)
export const Image = mongoose.models.Image || mongoose.model('Image', imageSchema)


