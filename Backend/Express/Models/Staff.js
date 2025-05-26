let mongo =require("mongoose");

let staff_collection=mongo.Schema({
    staff_name:{
        type:String,
        required:true
    },
    staff_email:{
    type:String,
    require:true,
    unique:true
    },
    Age:{
     type:Number,
     required:true
    },
    Gender:{
    type:String,
    required:true
    },
    Phone_no:{
    type:String,
    },
    Address:{
    type:String,
    require:true
    },
    Role:{
     type:String,
     required:true
    },
    Shift_Timing:{
    type:String,
    required:true
    },
    password:{
    type:String,
    required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongo.model("staff" ,staff_collection)