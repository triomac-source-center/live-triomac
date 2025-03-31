import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

export const connect = async () => {
    
    const DATABASE_URL = process.env.SIGNING_SECRET
    if (cached.conn) return cached.conn;

    cached.promise = cached.promise || mongoose.connect(DATABASE_URL, {
        dbName: "userauthbase",
        bufferCommands: false,
        connectTimeoutMS: 30000,
    });

    cached.conn = await cached.promise;
    return cached.conn
};
