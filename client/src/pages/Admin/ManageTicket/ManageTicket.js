import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_TICKETS} from '../../../utils/queries'
import {Link} from 'react-router-dom';
export default function ManageTicket() {
    const{loading,data}=useQuery(GET_TICKETS);
    const tData=data?.getTickets;
    
    return (
        <div className="container section">
        <h1>Tickets</h1>
        <div className="row">
            {
                tData?
                tData.map(({_id,title,created_on,ticket_type,assigned})=>{
                   return (<div className="col s4">
                    <Link to={`/ticket-detail/${_id}`}>
                    <div id={_id} className="card clickable">
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
                </Link>
                </div>)
                })
                :null
            }
               
           

        </div>
    </div>
    
    )
}
