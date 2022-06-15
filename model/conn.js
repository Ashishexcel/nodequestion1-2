const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/myapp',{
        // useUnifiedTopology:true,
        // useNewUrlParser:true
    }).then(()=>{
        console.log('database connected');
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connection;