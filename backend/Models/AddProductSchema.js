const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:false
    },
    price: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model('Product', AddProductSchema);
module.exports = Product;
