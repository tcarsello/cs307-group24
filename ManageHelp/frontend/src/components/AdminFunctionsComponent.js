import InviteUserForm from './InviteUserForm'
import UpdateWorkspaceInfoForm from "./UpdateWorkspaceInfoForm"
import RemoveUserForm from './RemoveUserForm'
import EditEmployeeDataForm from './EditEmployeeDataForm'
import PromoteDemoteForm from './PromoteDemoteForm'

export default function AdminFunctionsComponent({workspace, render_func}) {
    return (
        <div id="admin-function-container">
            <h4>Admin Dashboard</h4>
            <InviteUserForm joinCode={workspace.joinCode} spacename={workspace.companyName}/>
            <br />
            <UpdateWorkspaceInfoForm id={workspace._id} joinCode={workspace.joinCode} workspaceName={workspace.companyName} render_func={render_func}/>
            <br />
            <RemoveUserForm workspaceID={workspace._id} />
            <br />
            <EditEmployeeDataForm workspace_id={workspace._id} render_func={render_func}/>
            <br />
            <PromoteDemoteForm workspace_id={workspace._id}/>
        </div>
    )
}