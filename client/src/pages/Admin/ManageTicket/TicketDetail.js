import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useQuery,useMutation} from '@apollo/client';
import {UPDATE_TICKET} from '../../../utils/mutations';
import {GET_TICKETNSERVICES} from '../../../utils/queries';
export default function TicketDetail() {

const {id}=useParams();
const[updateTicket,{error}]= useMutation(UPDATE_TICKET);
const [assigned,setAssigned]=useState(false);
const {loading,data}=useQuery(GET_TICKETNSERVICES,{variables:{ticketId:id}})
if(loading) return null;
const Data=data?.getTicketnServices;

    

const assignTicket=async(memberId,ticketId)=>{
    try {
        const { data } = await updateTicket({
          variables: { member_id:memberId,ticket_id:ticketId }
        });
        console.log(data);
        setAssigned(true);
        } catch (err) {
            console.log(err.graphQLErrors[0]);
      }
   
}
return (
        <div className="container section">
        <h5>Manage the Ticket</h5>
        <div className="row">
            <div className="col s12 m12">
                <div className="card blue-grey darken-1 detail-card">
                    <div className="card-content white-text">
                    <span className="card-title">{Data.ticket.title}</span>
                    <p>{Data.ticket.description}</p>
                    </div>
                    <div className="card-action">
                        <span>Phone: {Data.ticket.phone}</span>
                        <span>Ticket Type: {Data.ticket.ticket_type}</span>
                        <span>Created on: {Data.ticket.created_on}</span>
                    </div>
                </div>
            </div>
        </div>
        {
            assigned?
            <h3 id="span-message" className="custom-badge green">
            Ticket Assigned Successfully!
            </h3>:
        <section id="services">
        <h5>Assign to Suitable IT Member</h5>
        <table className="centered">
        <thead>
        <tr>
            <th>Member Name</th>
            <th>Service Title</th>
            <th>Phone</th>
            <th>Service Type</th>
            <th>Years of Experience/Operation</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            {
                    Data?
                    Data.services.map(service=>{
                        return(
                        <tr>
                            <td className="text-capitalize">{service.created_by.fullname}</td>
                            <td>{service.title}</td>
                            <td>{service.phone}</td>
                            <td>{service.service_type}</td>
                            <td>{service.year_of_exp}</td>
                            <td><button 
                            onClick={()=>{
                                assignTicket(service.created_by._id,Data.ticket._id)}} 
                            className="btn-assign">Assign</button></td>
                        </tr>
                        )
                    }):
                    <tr>
                        <td colspan="5"><h3>No service available to be assigned</h3></td>
                    </tr>
                }
                
                    
                </tbody>
            </table>
            </section>

        }
       
       
    
    </div>)
}
