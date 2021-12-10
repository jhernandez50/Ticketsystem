import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_MEMBERS} from '../../../utils/queries';
import {UserTable} from '../../../components/DataTable'

export default function ViewMembers() {
    const{loading,data}=useQuery(GET_MEMBERS);
    const membersData=data?.getMembers;
    return (
        <div class="container">
            <h3>All IT Members</h3>
    
        <table class="centered">
            <thead>
                <tr>
                <th>Member Name</th>
                <th>Email</th>
                <th>System User Type</th>
                </tr>
            </thead>
                <tbody>
                {
                    membersData?
                    membersData.map(member=><UserTable key={member._id} user={member}/>):
                    <tr>
                        <td colspan="3"><h3>No customer added yet.</h3></td>
                    </tr>
                }
                    
                
                </tbody>
            </table>
        </div>
    )
}
