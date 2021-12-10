import React from 'react'
import {Link} from 'react-router-dom';
export default function Dashboard() {
    return (
        <div className="container">
        <h3>Admin dashboard</h3>
    <div className="section left-align">
            <Link to="/add-ticket" className="waves-effect waves-light btn-large">Add ticket</Link>
            <br/>
            <br/>
            <Link to="/manage-tickets" className="waves-effect waves-light btn-large">Manage Tickets</Link>
            <br/>
            <br/>
            <Link to="/it-members" className="waves-effect waves-light btn-large">View IT Members</Link>
            <br/>
            <br/>
            <Link to="/customers" className="waves-effect waves-light btn-large">View Customers</Link>
            <br/>
            <br/>
            <Link to="/services" className="waves-effect waves-light btn-large">View Services</Link>

    </div>
</div>
    )
}
