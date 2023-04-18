const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const cartCollection = 'carritos';

const cartsSchema = new mongoose.Schema({

    productos: [
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'productos',
            },
            quantity: {
            type:Number,
            default:1
        }
            ,
        }
    ],

    status: {
        type: Boolean,
        default:true
    },

})
cartsSchema.plugin(mongoosePaginate);
const Carritos = mongoose.model(cartCollection,cartsSchema);

module.exports = Carritos