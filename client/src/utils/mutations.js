import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation userLogin(
    $email: String!
    $password: String!
  ) {
    userLogin(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        fullname
        userType
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation userRegister(
    $fullname: String!
    $email: String!
    $password: String!
    $userType:String!
  ) {
    userRegister(
      fullname: $fullname
      email: $email
      password: $password
      userType:$userType
    ){
      message
    } 
    
  }
`;
export const ADD_TICKET = gql`
mutation addTicket(
  $title: String!
  $description: String!
  $phone: String!
  $ticket_type:String!
  $assigned:Boolean!
  $created_by:String!
  $created_on:String!
) {
  addTicket(
    title: $title
    description: $description
    phone: $phone
    ticket_type:$ticket_type
    assigned:$assigned
    created_by:$created_by
    created_on:$created_on
  ){
    message
  } 
  
}
`
export const ADD_SERVICE = gql`
mutation addService(
  $title: String!
  $description: String!
  $phone: String!
  $year_of_exp:String!
  $service_type:String!
  $created_by:String!
) {
  addService(
    title: $title
    description: $description
    phone: $phone
    year_of_exp:$year_of_exp
    service_type:$service_type
    created_by:$created_by
    ){
    message
  } 
  
}
`


export const SAVE_BOOK = gql`
  mutation saveBook($newBook: InputBook!) {
    saveBook(newBook: $newBook) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
