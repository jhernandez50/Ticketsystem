import React,{useState,useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {ADD_SERVICE} from '../../../utils/mutations'


export default function AddService() {
    const [serviceData,setService]=useState({
        title: "",
        description: "",
        phone: "",
        service_type:"product",
        year_of_exp:"",
        created_by:""
    })
    const[addservice,{error}]=useMutation(ADD_SERVICE);
    const[responseMessage,setReponceText]=useState({
        showMessage:false,
        message:""
    });
    useEffect(()=>{
        const userId=localStorage.getItem('user_id');
        setService({...serviceData,created_by:userId});
       
    },serviceData)
    const handleInput=(e)=>{
        const {value,name}=e.target;
        setService({...serviceData,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(serviceData);
            try {
                const { data } = await addservice({
                  variables: { ...serviceData }
                });
                console.log(data);
                setReponceText({...responseMessage,message:data.addService.message,showMessage:true})
                } catch (err) {
                    console.log(err.graphQLErrors[0]);
                setReponceText({...responseMessage,message:err.graphQLErrors[0],showMessage:true});
              }
       
        
    }
    return (
        <React.Fragment>
            <div class="container">
                <h1>Create Service</h1>
               { responseMessage.showMessage?
                <span id="span-message" className="custom-badge green">{responseMessage.message}</span>
                :null}
            </div>
            <div className="section container">
                <div className="row">
                    <form id="form-add-service" onSubmit={handleSubmit} className="col s12">
                        <div className="row card-panel">
                        <div className="input-filed col s6 mb-20">
                            <label htmlFor="title">Service Title:</label>
                            <input
                            value={serviceData.title}
                            onChange={handleInput} 
                            name="title" 
                            type="text" 
                            placeholder="service title" 
                            className="validate" required/>
                        </div>
                        <div className="input-filed col s12 mb-20">
                            <label htmlFor="description">Description:</label>
                            <input 
                            value={serviceData.description}
                            onChange={handleInput}
                            name="description" 
                            type="text" 
                            placeholder="Describe your service"/>
                        </div>
                        <div className="input-filed col s12 mb-20">
                            <label htmlFor="phone">Phone #:</label>
                            <input
                            value={serviceData.phone}
                            onChange={handleInput} 
                            name="phone" 
                            type="text" 
                            placeholder="eg. 00443445446"/>
                        </div>
                        <div className="input-filed col s6 mb-20">
                            <label htmlFor="year_of_exp">Years of Experience:</label>
                            <input 
                            name="year_of_exp" 
                            value={serviceData.year_of_exp}
                            onChange={handleInput}
                            type="number" 
                            placeholder="minimum 1 year" min="1"/>
                        </div>
                        <div className="col s12 mb-20">
                        <p>
                        <label htmlFor="">Service Type:</label>
                        <label>
                            <input 
                            name="service_type" 
                            value="product"
                            onChange={handleInput} 
                            type="radio" 
                            checked={serviceData.service_type==="product"} />
                            <span>Product</span>
                        </label>
                        <label>
                            <input name="service_type" 
                            value="service"
                            onChange={handleInput}
                            type="radio"
                            checked={serviceData.service_type==="service"}
                            />
                            <span>Service</span>
                        </label>
                        </p>
                        </div>
                        <div className="col s12 mb-20">
                                <button className="btn" type="submit">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </React.Fragment>
    )
}
