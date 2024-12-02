import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO;

if (!MONGODB_URI) {
    throw new Error (" please define mongo environment variable")
}

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to the database.");
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    }
    try{
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI!, opts);
        console.log("MongoDB connected successfully.");
        return mongoose;
    }
     catch (error) {
        // Nếu kết nối thất bại, in lỗi chi tiết và ném lỗi
        console.error("MongoDB connection error:", error);
        throw new Error("Could not connect to MongoDB.");
    }
}

export default connectToDatabase;