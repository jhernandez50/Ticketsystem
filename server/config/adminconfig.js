const {request,gql}=require('graphql-request');

const setAdmin=async()=>{
const mutation=gql`
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
`
const variables={
    fullname:"Admin",
    email:"admin@domain.com",
    password:"Admin007",
    userType:"admin"
}
try{
    const data=request('http://localhost:3001/graphql', mutation,variables);
    console.log("Admin is set");
}
catch(err){
    console.log(err.graphQLErrors[0])
}
}


module.exports=setAdmin