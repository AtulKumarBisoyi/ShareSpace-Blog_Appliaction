import mongoose from "mongoose";
import categoryModel from "./categoryModel.js";
import authModel from "./authModel.js";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});

const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel;
