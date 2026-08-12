import mongoose from "mongoose";


export const connectDB = async () => {

    const url = process.env.MONGODB_URI;
    
    if(!url){
        throw new Error("MONGODB_URI is not defined");
    }

    try {
        if(mongoose.connection.readyState === 1){
            return
        }
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        throw error;
    }
}