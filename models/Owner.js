const {model, Schema} = require('mongoose');


const owner_schema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


const Owner = model('owner', owner_schema);

module.exports = Owner;