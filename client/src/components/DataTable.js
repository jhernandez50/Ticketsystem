import React from 'react'

export function ServiceTable({service}) {
    return (
        <tr key={service._id}>
        <td class="text-capitalize">{service.created_by.fullname}</td>
        <td>{service.title}</td>
        <td>{service.phone}</td>
        <td>{service.service_type}</td>
        <td>{service.year_of_exp}</td>
        </tr>
    )
}
export function UserTable({user}) {
    return (
        <tr>
        <td class="text-capitalize">{user.fullname}</td>
        <td>{user.email}</td>
        <td>{user.userType}</td>
        </tr>
    )
}

