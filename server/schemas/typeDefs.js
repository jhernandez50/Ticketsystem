const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    fullname: String!
    email: String!
    password: String!
    userType: String!
  }

  type Service {
    _id: ID!
    title: String!
    description: String!
    phone:String!
    year_of_exp:String!
    service_type:String!
    created_by:String!
  }

  type Ticket {
    _id: ID!
    title: String!
    description: String!
    phone:String!
    ticket_type:String!
    assigned:Boolean
    created_by:String!
    created_on:String!
    assigned_to:String
  }
  type responceText{
    message:String!
  }
  type Auth{
    token:ID
    user:User
  }
  type Query {
    me: User
    getServices:[Service!]
    getTickets:[Ticket!]
    getMembers:[User!]
    getCustomers:[User!]
    getServiceDetail:[Service!]
    getMyTickets:[Ticket!]
    getAssignedTickets:[Ticket!]
  }

  type Mutation {
    userRegister(fullname:String,email:String,password:String,userType:String):responceText
    userLogin(email: String!, password: String!): Auth
    addService(title: String!, description: String!, phone: String!,year_of_exp:String!,service_type:String!,created_by:String!): responceText
    addTicket(title: String!, description: String!, phone: String!,ticket_type:String!,assigned:Boolean!,created_by:String!,created_on:String!): responceText
  }
`;

module.exports = typeDefs;