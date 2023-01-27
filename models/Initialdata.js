const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentDetails = new Schema({
  name:{type: String,required:true},
    email: {type: String,Number, unique:true},
    Password : {type: Number, required: true},
    
  });


const userModel = mongoose.model('InitialData', studentDetails);

module.exports = userModel;
