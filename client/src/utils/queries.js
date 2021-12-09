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
;