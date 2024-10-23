import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
});

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
