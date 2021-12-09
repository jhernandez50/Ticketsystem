import React from 'react'

export default function Homepage({user}) {
    return (
        <div className="container">
          <div className="row  grey lighten-3 z-depth-3">
            <div className="col s4">
            {user.userType==="customer"?[
            <a href="/add-ticket" className="panel-link">
                <span className="card-title white-text">
                  Add Ticket
                </span>
              </a>,
              <div className="divider"></div>,
              <a href="/my-tickets" className="panel-link">
              <span className="card-title white-text">
                My Tickets
              </span>
            </a>
            ]:
            [<a href="/add-service" className="panel-link">
            <span className="card-title white-text">
              Add Service
            </span>
          </a>,
           <a href="/assigned-tickets" className="panel-link">
           <span className="card-title white-text">
             Assigned Tickets
           </span>
         </a>
          ]
            }
            
             
              
              
             
            </div>
            <div className="col s8">
                <img src="https://images.pexels.com/photos/4065868/pexels-photo-4065868.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="ticket" style={{width:"100%",height:"100%"}}/>
            </div>
            </div>
          </div>
    )
}
