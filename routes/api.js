const router = require('express').Router();
const Resturant = require('../models/Resturant');
const Item = require('../models/Item');
const Order = require('../models/Order');
router.get('/items/:rid',async (req,res)=>{
    const {rid} = req.params;
    const items = await Item.find({resturant_id: rid});
    res.json(items);
}).put('/order/update/:id',async (req,res)=>{
    const {status} = req.body;
    const {id} = req.params;
    const order = await Order.findById(id);
    order.status = status;
    await order.save();
    res.json(order);
}).post('/add/item',async (req,res)=>{
    const {name,food_type,price,resturant_id,veg} = req.body;
    const item = new Item({name,food_type,price,resturant_id,veg});
    await item.save();
    res.json(item);
}).post('/order/:rid',async (req,res)=>{
    const {rid} = req.params;
    const {items,total_price,ordered_by} = req.body;
    const order = new Order({items,total_price,ordered_by,resturant_id: rid});
    await order.save();
    res.json(order);
}).get('/user/orders/:id',async (req,res)=>{
    const {id} = req.params;
    const orders = await Order.find({ordered_by: id});
    res.json(orders);
}).get('/owner/orders/:id',async (req,res)=>{
    const {id} = req.params;
    const orders = await Order.find({resturant_id: id});
    res.json(orders);
}).post('/create/resturant',async (req,res)=>{
        const {location,city,name,owner} = req.body;
        const resturant = new Resturant({location,city,name,owner});
        await resturant.save();
        res.json(resturant);
}).get('/resturants',async (req,res)=>{
    const resturants = await Resturant.find();
    res.json(resturants);
}).get('/resturant/:id',async (req,res)=>{
    const {id} =req.params;
    const resturant = await Resturant.findById(id);
    res.json(resturant);
}).get('/item/:id',async (req,res)=>{
    const {id} = req.params;
    const item = await Item.findOne({_id: id});
    res.json(item);
})

module.exports = router;