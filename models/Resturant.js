const {model, Schema} = require('mongoose');


const resturant_schema = new Schema({
   
   location:{
        type: String,
        required: true
   },
   city:{
        type: String,
        required: true
   },
   name:{
        type: String,
        required: true
   },
   owner:{
       type:String,
       required:true
   },
   orders:{
         type:Array,
         default:[]
   }
})


const Resturant = model('resturant', resturant_schema);

module.exports = Resturant;