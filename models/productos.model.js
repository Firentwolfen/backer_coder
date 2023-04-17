const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = 'productos';

const productosSchema = new mongoose.Schema({

    code: {
        unique: true,    
        type: Number,
    },
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: {
    type: [String],
    },
    status: {
       type: Boolean,
    default:true,
    }

})
productosSchema.plugin(mongoosePaginate);
const Productos = mongoose.model(productCollection,productosSchema);

module.exports = Productos