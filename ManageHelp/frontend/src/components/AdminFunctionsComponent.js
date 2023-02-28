import { useState } from "react"

import InviteUserForm from './InviteUserForm'

export default function AdminFunctionsComponent({workspace}) {
    return (
        <div id="admin-function-container">
            <h4>Admin Dashboard</h4>
            <InviteUserForm joinCode={workspace.joinCode} spacename={workspace.companyName}/>
        </div>
    )
}