import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined');
if (!dbName) throw new Error('MONGODB_DB is not defined');

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName,
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
}
