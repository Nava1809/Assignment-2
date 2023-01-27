const mongoose=require("mongoose");
async function getconnection(){
    await mongoose.connect('mongodb://localhost/api1')
}
module.exports=getconnection;