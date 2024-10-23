import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
        const res = await mongoose.connect("mongodb://127.0.0.1:27017/blog-mern-project");

        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
};

export default connectToMongo;
