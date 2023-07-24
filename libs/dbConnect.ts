import mongoose from "mongoose"

const DB_URI = process.env.DB_URI

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

let globalThisWithDB = global as typeof globalThis & {
  mongoose?: {
    conn: {} | null,
    promise: Promise<typeof mongoose> | null,
  }
}

globalThisWithDB.mongoose = globalThisWithDB.mongoose ?? { conn: null, promise: null }
let cached = globalThisWithDB.mongoose

async function dbConnect() {
  // ! (non-null operator of TypeScript) tells TS compiler that the variable will not be null or undefined in this context
  if (cached.conn) {
    console.log('Using cached connection to the Database!')
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(DB_URI!, opts).then((mongooseConn) => {
      console.log("Created a new connection to the Database!")
      return mongooseConn
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect