import { useState } from "react"

import InviteUserForm from './InviteUserForm'
import UpdateWorkspaceInfoForm from "./UpdateWorkspaceInfoForm"
import RemoveUserForm from './RemoveUserForm'

export default function AdminFunctionsComponent({workspace, render_func}) {
    return (
        <div id="admin-function-container">
            <h4>Admin Dashboard</h4>
            <InviteUserForm joinCode={workspace.joinCode} spacename={workspace.companyName}/>
            <br />
            <UpdateWorkspaceInfoForm id={workspace._id} joinCode={workspace.joinCode} workspaceName={workspace.companyName} render_func={render_func}/>
            <br />
            <RemoveUserForm workspaceID={workspace._id} />
        </div>
    )
}