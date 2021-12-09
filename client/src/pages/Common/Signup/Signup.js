import React,{useState,useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {REGISTER_USER} from '../../../utils/mutations'

export default function Signup() {
    const [signupData,setSignup]=useState({
        fullname:"",
        email:"",
        password:"",
        confirmPassword:"",
        userType:"member"
    })
    const[responseMessage,setReponceText]=useState({
        showMessage:false,
        registered:false,
        message:""
    });
   
    const [register,{error}]=useMutation(REGISTER_USER)
    const handleChange=(e)=>{
        const {value,name}=e.target;
        setSignup({...signupData,[name]:value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(signupData.password===signupData.confirmPassword){
            try {
                const registerData={
                    fullname:signupData.fullname,
                    email:signupData.email,
                    password:signupData.password,
                    userType:signupData.userType
                }
                const { data } = await register({
                  variables: { ...registerData }
                });
                console.log(data);
                setReponceText({...responseMessage,message:data.userRegister.message,registered:true,showMessage:true})
                } catch (err) {
                    setReponceText({...responseMessage,message:err.graphQLErrors[0].message,registered:false,showMessage:true});
              }
        }else{
            setReponceText({...responseMessage,message:"Password mismatch!",registered:false,showMessage:true})
        }
        
    }
    return (
        <React.Fragment>
            <div className="container">
            <h1>Register</h1>
            { responseMessage.showMessage?
                responseMessage.registered?
                <span id="span-message" className="custom-badge green">{responseMessage.message}</span>:
                <span id="span-message" className="custom-badge red">{responseMessage.message}</span>
                :null
            }
            </div>
           
            <div className="section container">
                <div className="row">
                    <form id="form-register" onSubmit={handleSubmit} className="col s12">
                        <div className="row card-panel">
                        <div className="input-filed col s6 mb-20">
                            <label htmlFor="fullname">Full Name:</label>
                            <input onChange={handleChange} name="fullname" type="text" placeholder="Ingresa tu nombre" className="validate" required/>
                        </div>
                       <div className="input-filed col s12 mb-20">
                            <label htmlFor="email">Email:</label>
                            <input onChange={handleChange} name="email" type="email" placeholder="Ingresa tu correo"/>
                        </div>
                        <div className="input-filed col s6 mb-20">
                            <label htmlFor="password">Password:</label>
                            <input onChange={handleChange} name="password" type="text" placeholder="Ingresa tu apellido" className="validate" required/>
                        </div>
                        <div className="input-filed col s6 mb-20">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input onChange={handleChange} name="confirmPassword" type="text" placeholder="Ingresa tu apellido" className="validate" required/>
                        </div>
                        <div className="col s12 mb-20">
                        <p>
                        <label htmlFor="">Register as:</label>
                        <label>
                            <input 
                            name="userType" 
                            value="member"
                            onChange={handleChange} 
                            type="radio" 
                            checked={signupData.userType==="member"} />
                            <span>IT member</span>
                        </label>
                        <label>
                            <input 
                            name="userType" 
                            value="customer"
                            onChange={handleChange}
                            type="radio"
                            checked={signupData.userType==="customer"}/>
                            <span>Customer</span>
                        </label>
                        </p>
                        </div>
                        <div className="col s12 mb-20">
                        <button className="btn" type="submit">Submit</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>

        </React.Fragment>
    )
}
