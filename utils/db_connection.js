const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connect_db = async ()=>{
    try{
        const is_connected = await mongoose.connect(process.env.DB_URL);
        return is_connected;
    }
    catch(err){
        return false;
    }
}

module.exports = connect_db;