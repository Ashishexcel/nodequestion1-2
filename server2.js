
const  mongoose = require('mongoose');
const http = require('http');

const uri = "mongodb+srv://Ashish05:Ashish@cluster0.pss1vwa.mongodb.net/myapp?retryWrites=true&w=majority"


var conn = mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});// problem is in this I have made a mongodb connection but i HAVE TO MAKE mongoose connection



const userid_schema = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},  // here I have used object id which reference to the USer collections id's
    dob:String,
    age:Number,
    mobile_number:Number
},{
    strict:false,
    collection:"UserId"
});

var UserId = mongoose.model('UserId',userid_schema);


const userProfile = [ 
    {
        userid: "62a733e1fd45e2d862668629",
        dob:"2000-08-05",
        mobile_number:"123"
    
    },
    {
        userid: "62a733e1fd45e2d86266862a",
        dob:"1990-04-23",
        mobile_number:"123"
    },
    {
        userid: "62a733e1fd45e2d86266862b",
        dob:"1995-06-22",
        mobile_number:"123"
    },
    {
        userid: "62a733e1fd45e2d862668628",
        dob:"2001-05-23",
        mobile_number:"123"
    },
    {
        userid: "62a733e1fd45e2d862668629",
        dob:"1998-04-26",
        mobile_number:"123"
    }
]

function inseruserid(userProfile){
    for(let i=0;i<userProfile.length;i++){
        (function(row){
            const newuserid = new UserId({
                userid:row.userid,
                dob:row.dob,
                age:new Date().getFullYear()- parseInt(row.dob),  // here adding age of user from dob
                mobile_number:row.mobile_number
            });
            newuserid.save(newuserid,function(err){
                if(err) console.log(err)
                else{
                    console.log("data added")
                }
            })

        })(userProfile[i])
    }
}
// inseruserid(userProfile);

// find average age of all user:
async function findalluserage(){
    const totaluser = await UserId.countDocuments();
    const alluserage  = await UserId.find({},{age:1,_id:0})
    let avg = alluserage.reduce((sum,tax)=>{
        return sum+tax.age;
    },0);
    console.log(avg/totaluser);
}
findalluserage();







//delete user
async function deleteuser(){
    const deleteddata = await UserId.deleteMany({age:{$gte:25}}); //change from remove to deletemany because of deprecations
    console.log(deleteddata)
}
// deleteuser();



http.createServer((req,res)=>{
    res.write('this is my app');
    console.log("server is on")
    res.end();
}).listen(8080);

module.exports = UserId;