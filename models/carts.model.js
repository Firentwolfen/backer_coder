const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const cartCollection = 'carritos';

const cartsSchema = new mongoose.Schema({

    productoscarro: {
    type: [
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: {
            type:Number,
            default:0
        }
            ,
        }
    ],
    default:[]
    },
    status: {
        type: Boolean,
        default:true
    },

})
cartsSchema.plugin(mongoosePaginate);
const Carritos = mongoose.model(cartCollection,cartsSchema);

module.exports = Carritos