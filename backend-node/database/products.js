//Products schema

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId:String,
    company:String,
    vendor: String,
    quantity: Number,
    warranty: Number

});

module.exports = mongoose.model("products", productSchema);