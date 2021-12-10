import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS} from '../../../utils/queries';
import {UserTable} from '../../../components/DataTable'

export default function ViewCustomers() {
    const{loading,data}=useQuery(GET_CUSTOMERS);
    const customersData=data?.getCustomers;
    return (
        <div class="container">
            <h3>All Customers</h3>
    
        <table class="centered">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>System User Type</th>
                </tr>
            </thead>
                <tbody>
                {
                    customersData?
                    customersData.map(member=><UserTable key={member._id} user={member}/>):
                    <tr>
                        <td colspan="3"><h3>No customer added yet.</h3></td>
                    </tr>
                }
                    
                
                </tbody>
            </table>
        </div>
    )
}
