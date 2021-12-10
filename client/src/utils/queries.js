import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      fullname
      email
      userType
    }
  }
`
export const MY_TICKETS = gql`
   {
    getMyTickets{
        _id
        title
        ticket_type
        created_on
        assigned
      }
     
    }
`
export const ASSIGNED_TICKETS = gql`
   {
    getAssignedTickets{
        _id
        title
        ticket_type
        created_on
      }
  }
`
export const GET_SERVICES=gql`
{
getServices{
  _id
  title
  phone
  year_of_exp
  service_type
  created_by{
    _id
    fullname
  }
} 
}
`
export const GET_CUSTOMERS=gql`
{
  getCustomers{
    _id
     fullname
    email
    userType
  }
}
`
export const GET_TICKETS=gql`
{
	getTickets{
    _id
    title
    phone
  	ticket_type
    assigned
  } 
}
`
export const GET_MEMBERS=gql`
{
  getMembers{
    _id
    fullname
    email
    userType
  }
}
`
export const GET_TICKETNSERVICES=gql`
query getTicketnServices($ticketId:String) {
	getTicketnServices(ticketId:$ticketId){
    ticket{
      _id
      title
      phone
      ticket_type
      created_on
    }
    services{
      _id
      title
      phone
      service_type
      year_of_exp
      created_by{
        _id
        fullname
      }
      }
   
  } 
}
`
;