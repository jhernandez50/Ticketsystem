import React,{useState,useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {ADD_TICKET} from '../../../utils/mutations'

export default function AddTicket({user}) {
    const [ticketData,setTicket]=useState({
        title: "",
        description: "",
        phone: "",
        ticket_type:"product",
        assigned:false,
        created_by:"",
        created_on:"12-8-2021"
    })
    const[addticket,{error}]=useMutation(ADD_TICKET);
    const[responseMessage,setReponceText]=useState({
        showMessage:false,
        message:""
    });
    useEffect(()=>{
        const userId=localStorage.getItem('user_id');
        setTicket({...ticketData,created_by:userId});
       
    },ticketData)
    const handleInput=(e)=>{
        const {value,name}=e.target;
        setTicket({...ticketData,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(ticketData);
            try {
                const { data } = await addticket({
                  variables: { ...ticketData }
                });
                console.log(data);
                setReponceText({...responseMessage,message:data.addTicket.message,showMessage:true})
                } catch (err) {
                setReponceText({...responseMessage,message:err.graphQLErrors[0],showMessage:true});
              }
       
        
    }
    return (
        <React.Fragment>
        <div className="container">
            <h1>Create Ticket</h1>
            {
                responseMessage.showMessage?
                [<span id="span-message" className="custom-badge green">{responseMessage.message}</span>,
                <a href="/add-ticket" className="btn-message light mr-1">Add more tickets</a>,
                <a href="/my-tickets" className="btn-message dark">My tickets</a>
                ]
                    
                    
                
                :null
            }
            
        </div>
        <div className="section container">
            <div className="row">
                <form id="form-add-ticket" className="col s12" onSubmit={handleSubmit}>
                    <div className="row card-panel">
                    <div className="input-filed col s6 mb-20">
                        <label htmlFor="title">Title:</label>
                        <input 
                        name="title" 
                        type="text"
                        value={ticketData.title}
                        onChange={handleInput}
                        
                        placeholder="please write briefly what you need" 
                        className="validate" required/>
                    </div>
                    <div className="input-filed col s12 mb-20">
                        <label htmlFor="description">Description:</label>
                        <input 
                        name="description" 
                        type="text"
                        value={ticketData.description}
                        onChange={handleInput}
                        placeholder="Describe your need here..."/>
                    </div>
                    <div className="input-filed col s12 mb-20">
                        <label htmlFor="phone">Phone #:</label>
                        <input 
                        name="phone" 
                        type="text" 
                        value={ticketData.phone}
                        onChange={handleInput}
                        placeholder="Describe your need here..."/>
                    </div>
                    <div className="col s12 mb-20">
                    <p>
                    <label htmlFor="">Ticket Type:</label>
                    <label>
                        <input 
                        name="ticket_type" 
                        value="product"
                        checked={ticketData.ticket_type==="product"} 
                        type="radio"
                        onChange={handleInput}
                        />
                        <span>Product</span>
                    </label>
                    <label>
                        <input 
                        name="ticket_type" 
                        value="service"
                        checked={ticketData.ticket_type==="service"} 
                        type="radio"
                        onChange={handleInput}
                        />
                        <span>Service</span>
                    </label>
                    </p>
                    </div>
                    <div className="col s12 mb-20">
                        <button className="btn" type="submit">Create</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        </React.Fragment>
    )
}
