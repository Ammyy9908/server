const {model, Schema} = require('mongoose');


const order_schema = new Schema({
  items:{
    type:Array,
    default:[]
  },
  total_price:{
    type:Number,
    required:true
  },
  ordered_by:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'pending'
  },
  resturant_id:{
    type:String,
    required:true
  }
})


const Order = model('order', order_schema);

module.exports = Order;