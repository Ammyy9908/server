const {model, Schema} = require('mongoose');


const item_schema = new Schema({
  name:{
    type: String,
    required: true
  },
  resturant_id:{
    type: String,
    required: true
  },
  food_type:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  veg:{
    type: Boolean,
    required: true
  }
})


const Item = model('item', item_schema);

module.exports = Item;