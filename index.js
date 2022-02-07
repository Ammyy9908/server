const express = require('express');
const connect_db = require('./utils/db_connection');
const cors = require('cors');
const app = express();
const auth_routes = require('./routes/auth');
const api_routes = require('./routes/api');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connect_db().then((feedback)=>{
    if(feedback){
        console.log("Database connected successfully");
    }
    else{
        console.log("Database connection failed");
    }
})

app.use('/api',api_routes);
app.use('/auth', auth_routes);

const port = process.env.PORT||5000 ;


app.listen(port,()=>{
    console.log(`Listen on port ${port}`);
})