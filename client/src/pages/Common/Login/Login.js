import React,{useState,useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN_USER} from '../../../utils/mutations'
import auth from '../../../utils/auth';
export default function Login(props) {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [errorMessage,setError]=useState("");
    const [login, { error }] = useMutation(LOGIN_USER);

    
    const handleInput=(e)=>{
        const {value,name}=e.target;
        setUserFormData({...userFormData,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const { data } = await login({
              variables: { ...userFormData }
            });
            console.log(data);
            const {_id,fullname,userType}=data.userLogin.user;
            console.log(props.user)
            props.setUser({...props.user,"userId":_id,
                "userName":fullname,
                "userType":userType,
                "isLoggedIn":true});
            auth.login(data.userLogin.token);
            auth.setUser(data.userLogin.user);
            } catch (err) {
                if(err.graphQLErrors.length!=0){
                    setError(err.graphQLErrors[0].message);
                }
           
          }
    }
    return (
        <React.Fragment>
        <div className="container">
            <h1>Log In</h1>
        </div>
        <div className="section container">
            {
                errorMessage?
                <span id="span-message" className="custom-badge red">{errorMessage}</span>:
                null
            }
            
            <div className="row">
                <form id="form-login" onSubmit={handleSubmit} className="col s12">
                    <div className="row card-panel">
                    <div className="input-filed col s6">
                        <label htmlFor="email">Email:</label>
                        <input name="email" onChange={handleInput} type="text" placeholder="Ingresa tu nombre"  className="validate" required/>
                    </div>

                    <div className="input-filed col s6">
                        <label htmlFor="password">Password:</label>
                        <input name="password" onChange={handleInput} placeholder="Ingresa tu apellido" id="apellido" className="validate" required/>
                    </div>
                    <button 
                    disabled={!(userFormData.email&&userFormData.password)}
                    className="btn" 
                    type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

        </React.Fragment>
    )
}
