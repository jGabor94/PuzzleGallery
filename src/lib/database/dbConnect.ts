import { Mongoose, connect } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error(
  'Please define the MONGODB_URI environment variable inside .env.local'
)

declare global {
  var mongoose: {
    conn: Mongoose | null;
  };
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null }
}

export const dbConnect = async () => {

  if (cached.conn) return cached.conn

  try {
    cached.conn = await connect(MONGODB_URI, { dbName: process.env.MONGODB_COLLECTION })
    console.log('DB connection success')
  }
  catch (error) {
    console.log('DB connection failed' + error)
  }

  return cached.conn

}

//export const clientPromise = cached.promise