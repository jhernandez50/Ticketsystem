const { AuthenticationError } = require('apollo-server-express');
const { User,Ticket,Service } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt=require('bcrypt');
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getServices:async()=>{
      const serviceData=await Service.find({}).populate("created_by");
      return serviceData
    },
    getTickets:async()=>{
      const ticketData=await Ticket.find({});
      return ticketData
    },
    getMembers:async()=>{
      const memberData=await User.find({userType:"member"});
      return memberData;
    },
    getCustomers:async()=>{
      const customerData=await User.find({userType:"customer"});
      return customerData;
    },
    getMyTickets:async(parent, args, context)=>{
      console.log(context.user);
      const ticketData=await Ticket.find({created_by:context.user._id});
      return ticketData
    },
    getAssignedTickets:async(parent,args,context)=>{
      console.log(context.user)
      const ticketData=await Ticket.find({assigned_to:context.user._id});
      return ticketData
    },
    getTicketnServices:async(parent,args,context)=>{
      const {ticketId}=args;
      const ticketData=await Ticket.find({_id:ticketId}).populate('created_by');
      const serviceData=await Service.find({}).populate('created_by');
      console.log(serviceData);
      return {ticket:ticketData[0],services:serviceData}
    }

   },

  Mutation: {
    userRegister: async (parent, {email,password,fullname,userType}) => {
      const checkEmail=await User.find({email:email});
      if(checkEmail.length==0){
        let user = new User();
        user.fullname=fullname;
        user.email=email;
        user.password=await bcrypt.hash(password,10);
        user.userType=userType;
        user.save();
        return {message:"Congrats! You are registered successfuly."};
      }
      if(userType=="admin"){
        return {message:"Admin exists already!"};
      }
      throw new AuthenticationError("User exists already!")
     },
    userLogin:async(parent,args,context)=>{

      const{email,password}=args;
      console.log(context.user);
      const userData=await User.find({email:email})
        if(userData.length==0){
          throw new AuthenticationError("User not found!"); 
        }
         const isValid=await bcrypt.compare(password,userData[0].password)
        if(!isValid){
          throw new AuthenticationError("Password incorrect!");
        }
        const user=userData[0];
        const token=signToken(user);
        return {token,user};
    },
    addService:async(parent,args)=>{
      console.log(args);
      console.log("im hitting");
      
      const service=new Service(args);
      service.save();
      return {message:"Service added successfuly!"};
    }
    ,
    addTicket:async(parent,args)=>{
      const ticket=new Ticket(args);
      ticket.save();
      return {message:"Ticket added successfuly!"};
    },
    assignTicket:async(parent,args)=>{
      const{member_id,ticket_id}=args;
      const ticket=await Ticket.findOneAndUpdate({_id:ticket_id},
        {assigned_to:member_id,assigned:true},
        {returnOriginal:false})
      return ticket;
    }
  }
  ,
 
};

module.exports = resolvers;
