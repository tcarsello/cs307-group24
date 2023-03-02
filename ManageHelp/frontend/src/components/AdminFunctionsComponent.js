import InviteUserForm from './InviteUserForm'
import UpdateWorkspaceInfoForm from "./UpdateWorkspaceInfoForm"
import RemoveUserForm from './RemoveUserForm'
import EditEmployeeDataForm from './EditEmployeeDataForm'
import PromoteDemoteForm from './PromoteDemoteForm'
import EmployeeDetails from './EmployeeDetails'
import { useEffect } from 'react'
import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Collapsible from 'react-collapsible';

const AdminFunctionsComponent = ({workspace, render_func}) => {
    const { employees, dispatch } = useEmployeeContext()
    const {user} = useAuthContext() 

    const workspaceID = workspace._id

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/workspaces/getEmployees/' + workspaceID, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            })
            const json = await response.json()


            if (response.ok) {
                dispatch({type: 'SET_EMPLOYEES', payload: json})
            }
        }

        if (user) {
            fetchEmployees()
        }
    }, [dispatch, user, workspaceID])

    return (
        <div id="admin-function-container">
            <h2>Admin Dashboard</h2>
            <div className="workspaces">
                <h3>Employee List</h3>
                {employees && employees.map(employee => (
                <EmployeeDetails workspace={workspace} 
                employee={employee}
                key={employee._id}/>
                ))}
            </div>
        
            <Collapsible trigger="Invite Employee">
            <InviteUserForm joinCode={workspace.joinCode} spacename={workspace.companyName}/>
            </Collapsible>
            <br />
            <UpdateWorkspaceInfoForm id={workspace._id} joinCode={workspace.joinCode} workspaceName={workspace.companyName} render_func={render_func}/>
            <br />
            <RemoveUserForm workspaceID={workspace._id} render_func={render_func}/>
            <br />
            <EditEmployeeDataForm workspace_id={workspace._id} render_func={render_func}/>
            <br />
            <PromoteDemoteForm workspace_id={workspace._id} render_func={render_func}/>
        </div>
    )
}

export default AdminFunctionsComponent