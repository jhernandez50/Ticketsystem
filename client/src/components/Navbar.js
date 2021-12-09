import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Auth from '../utils/auth'
export default function Navbar({user}) {
  const handleLogout=()=>{
    Auth.logout();
  }
  return (
  <header>
  <div className="container-fluid">
          <div className="row ">
            <div className="col s12 p-default">
              <div className="card teal darken-1">
                <div className="card-content white-text">
                  <div className="container">
                        <Link className="brand-logo" to="/"><span className="card-title">717 Networks</span></Link>
                   </div>
                </div>
                <div className="card-action teal darken-3">
                  <div className="container">
                  {user.isLoggedIn?
                  [<span className="text-greet" href="">Welcome {user.userName}</span>,
                  <button onClick={handleLogout} className="btn-logout ml-30">Logout</button>
                ]:[
                  <Link className="white-text" to="/login">Log In</Link>,
                  <Link className="white-text" to="/signup">Register</Link>
                ]}
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
</header>
    )
}
