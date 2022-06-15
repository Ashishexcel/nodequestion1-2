const http = require('http');
const md5 = require('md5');
// const {MongoClient} = require('mongodb');
const dotenv = require('dotenv').config();
const async = require('async');
const  mongoose = require('mongoose');


const uri = "mongodb+srv://Ashish05:Ashish@cluster0.pss1vwa.mongodb.net/myapp?retryWrites=true&w=majority" // cloud database


var conn = mongoose.connect(uri);// problem is in this I have made a mongodb connection but i HAVE TO MAKE mongoose connection




const  user_schema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
},{
    strict:false,
    collection:"User" //here collection name
});


var User = mongoose.model('User',user_schema); // here I am making model of collection


var records = [];

for(var i=0;i<5;i++){ // here I am pushing data into records array
    records.push({
        firstname:"Ashish" + i,
        lastname:"saini" + i,
        email:"ashish" + i + "@gmail.com",
        password:"Ashish",
    });
}


function insertAndNotify(records,callback){ // through this functions I am inserting data into database
    var inserted = 0;
    for(var i=0;i<records.length;i++){
        (function(row){
            var newUser =new User({
                firstname:row.firstname,
                lastname:row.lastname,
                email:row.email,
                password:md5(row.password)
            });
            newUser.save(newUser,function(err,row){  
                if(err){
                    console.log(err);
                }
                else{
                    inserted++;
                    
                }
                if(inserted == records.length){
                    callback();
                }
            })
        })
        (records[i])
    }
    
}

insertAndNotify(records,function(err){  // invoking 
    if(err){
        console.log(err);
        process.exit();
    }
    console.log("all done");
    process.exit();
});


http.createServer((req,res)=>{
    res.write('this is my app');
    console.log("server is on")
    res.end();
}).listen(8080);




