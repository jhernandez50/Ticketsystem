const mongoose=require('mongoose');
const Service=mongoose.model("Service",new mongoose.Schema({
    title:String,
    description:String,
    phone:String,
    year_of_exp:String,
    service_type:String,
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
}))
module.exports=Service