const {model, Schema} = require('mongoose');


const user_schema = new Schema({
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


const User = model('User', user_schema);

module.exports = User;