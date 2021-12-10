import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from './utils/queries';
import {Login,Signup} from './pages/Common';
import {Dashboard,ViewCustomers,ViewServices,ViewMembers,ManageTicket,TicketDetail} from './pages/Admin'
import {Homepage,MyTickets,AddTicket,AssignedTickets,AddService} from './pages/User'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
export default function Layout() {
    const { anything, data } = useQuery(GET_ME);
    const [user,setUser]=useState({
        userId:"",
        userName:"",
        userType:"",
        isLoggedIn:false
    });
    const isEmpty=(obj)=> {
        return Object.keys(obj).length === 0;
      }
      const userData = data?.me || {};
    useEffect(()=>{
        try{
           
            if(!isEmpty(userData)){
                const {_id,fullname,userType}=userData
                setUser({userId:_id,userName:fullname,userType:userType,isLoggedIn:true})
            }
        }
        catch(err){
            console.log(err);
        }

    },[userData])
    return (
            <Router>
            <Navbar user={user}/>
            <Switch>
                <Route path="/" exact render={user.isLoggedIn?
                ()=>(<Homepage user={user}/>):
                ()=>(<Login setUser={setUser} user={user}/>)}/>
                <Route path="/signup" render={()=>(<Signup/>)}/>
                <Route path="/login" render={()=>(<Login setUser={setUser} user={user}/>)}/>
                {/* customer routes */}
                {
                    user.userType==="customer"?
                    [
                        <Route path="/add-ticket" render={()=>(<AddTicket user={user}/>)}/>,
                        <Route path="/my-tickets" render={()=>(<MyTickets user={user}/>)}/>
                    ]:
                    null
                }
               
               
                {/* IT member routes */}
                {
                    user.userType==='member'?
                    [
                    <Route path="/add-service" render={()=>(<AddService user={user}/>)}/>,
                    <Route path="/assigned-tickets" render={()=>(<AssignedTickets user={user}/>)}/>
                    ]:
                    null
                }
                
                {/* Admin routes */}
                {
                   user.userType==='admin'?
                   [
                    <Route path="/dashboard" exact render={user.isLoggedIn&&user.userType==="admin"?
                    ()=>(<Dashboard/>):
                    ()=>(<Login setUser={setUser} user={user}/>)}/>,
                    <Route path="/services" render={()=>(<ViewServices />)}/>,
                    <Route path="/add-ticket" render={()=>(<AddTicket user={user}/>)}/>,
                    <Route path="/customers" render={()=>(<ViewCustomers/>)}/>,
                    <Route path="/it-members" render={()=>(<ViewMembers />)}/>,
                    <Route path="/manage-tickets" render={()=>(<ManageTicket/>)}/>,
                    <Route path="/ticket-detail/:id" render={()=>(<TicketDetail/>)}/>
                    ]:
                    null

                }
                

            </Switch>
            </Router>
        )
}
