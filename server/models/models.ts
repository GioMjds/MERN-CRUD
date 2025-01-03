import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/admin";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection failed: ", error);
        process.exit(1);
    }
};
