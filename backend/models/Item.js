import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    protein: {
        type: String,
        enum: ["Köttfärs", "Kyckling", "Kött", "Fläsk", "Veg", "Fisk", "Övrigt"],
        required: true,
    },
    desc: String,
    recipe: String,
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);

export default Item;