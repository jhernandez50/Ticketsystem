import React,{useState,useEffect} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ASSIGNED_TICKETS } from '../../../utils/queries';


export default function AssignedTickets() {
    const { loading,error,data } = useQuery(ASSIGNED_TICKETS);
    const tData=data?.getAssignedTickets||[];
    console.log(tData);
    return (
        <div className="container section">
        <h1>Tickets</h1>
        <div className="row">
        {
                tData?
                tData.map(({_id,title,created_on,ticket_type,})=>{
                   return (<div className="col s4">
                    <div id="" className="card">
                    <div className="card-content">
                        <span className="card-title">{title}</span>
                        <ul>
                         <li>Created on:{created_on}</li> 
                         <li>Type: {ticket_type}</li>
                         
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
