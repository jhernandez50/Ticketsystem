import React,{useState,useEffect} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { MY_TICKETS } from '../../../utils/queries';

export default function MyTickets(props) {
const[ticketData,setTicketData]=useState([]);
const { loading,error,data } = useQuery(MY_TICKETS);
const tData=data?.getMyTickets;

    return (
        <div className="container section">
        <h1>Tickets</h1>
        <div className="row">
            {
                tData?
                tData.map(({_id,title,created_on,ticket_type,assigned})=>{
                   return (<div className="col s4">
                    <div id="" className="card">
                    <div className="card-content">
                        <span className="card-title">{title}</span>
                        <ul>
                         <li>Created on:{created_on}</li> 
                         <li>Type: {ticket_type}</li>
                         <li>Resolved:<span id="span-message" className={assigned?"custom-badge badge-sm green":"custom-badge badge-sm red"}>{assigned?"YES":"NO"}</span>
                         </li> 
                        </ul>
                    </div>
                </div>
                </div>)
                })
                :null
            }
               
           

        </div>
    </div>
    )
}
