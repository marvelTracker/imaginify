import mongoose, {Mongoose} from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Connection cache for nextjs
// This is to support serverless architecture of nextjs
// Otherwise, mongoose will create a new connection on every request with nextjs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = {connection: null, promise: null};
}

export const connectToDatabase = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {dbName: "imaginify", bufferCommands: false});

  cached.connection = await cached.promise;

  return cached.connection;
};
