const mongoose=require('mongoose');
const Ticket=mongoose.model("Ticket",new mongoose.Schema({
    title:String,
    decription:String,
    phone:String,
    ticket_type:String,
    assigned:Boolean,
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    assigned_to:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    created_on:String
}))
module.exports=Ticket;