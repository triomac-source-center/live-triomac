import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

export const connect = async () => {
    if (cached.conn) return cached.conn;

    cached.promise = cached.promise || mongoose.connect('mongodb+srv://triomac60:F3v1K5wI0SK7c6nK@triomacdatas.hjmribt.mongodb.net/?retryWrites=true&w=majority&appName=Triomacdatas', {
        dbName: "userauthbase",
        bufferCommands: false,
        connectTimeoutMS: 30000,
    });

    cached.conn = await cached.promise;
    return cached.conn
};
