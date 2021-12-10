import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_SERVICES } from '../../../utils/queries';
import {ServiceTable} from '../../../components/DataTable'
export default function ViewServices() {
    const{anything,data}=useQuery(GET_SERVICES);
    const serviceData=data?.getServices;
    console.log(serviceData);
    return (
    <div class="container">
        <h3>Services by Members</h3>
            
        <table class="centered">
                <thead>
                <tr>
                    <th>Member Name</th>
                    <th>Service Title</th>
                    <th>Phone</th>
                    <th>Service Type</th>
                    <th>Years of Experience/Operation</th>
                </tr>
                </thead>
                <tbody>
                    {
                        serviceData?
                        serviceData.map(service=><ServiceTable service={service}/>):
                        <tr><td colspan="5"><h3>No service added yet.</h3></td></tr>
                    }
                </tbody>
            </table>
        </div>
        
    )
}
