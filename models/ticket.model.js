const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
    
    code: {
        unique: true,    
        type: Number,
    },
    purchaser: {
        unique: true,    
        type: String,
    },
    purchase_datetime: Date,
    amount: Number,
    status: {
       type: Boolean,
    default:true,
    }
})
ticketSchema.plugin(mongoosePaginate);
const Tickets = mongoose.model(ticketCollection,ticketSchema);

module.exports = Tickets