// this file is used to create a schema and model for storing food items in the database

import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true}
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema); // 2nd part is used to create model initially while 1st part is used to avoid recreation of model

export default foodModel;