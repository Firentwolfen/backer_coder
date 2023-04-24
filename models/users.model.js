const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const userCollection = 'user';

const usersSchema = new mongoose.Schema({

    first_name:String,
    last_name:String,
    email:{
        unique: true,    
        type: String,
    },
    age:Number,
    password:String,

})
usersSchema.plugin(mongoosePaginate);
const Usuarios = mongoose.model(userCollection,usersSchema);

module.exports = Usuarios