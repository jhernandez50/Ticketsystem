import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar';
import {Login,Signup} from './pages/Common';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from './utils/queries';

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
                <Route path="/add-ticket" render={()=>(<AddTicket user={user}/>)}/>
                <Route path="/my-tickets" render={()=>(<MyTickets user={user}/>)}/>
                <Route path="/add-service" render={()=>(<AddService user={user}/>)}/>
                <Route path="/assigned-tickets" render={()=>(<AssignedTickets user={user}/>)}/>
            </Switch>
            </Router>
        )
}
