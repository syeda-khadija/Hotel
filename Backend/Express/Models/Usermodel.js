let mongo=require("mongoose")

let Hotel_collection=mongo.Schema({
    user_name:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        require:true
    },
    Gender:{
        type:String,
       require:true
    },
    Address:{
        type:String,
       require:true
    },
    country:{
        type:String,
        default:"Pakistan"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongo.model("Hotel_user",Hotel_collection);