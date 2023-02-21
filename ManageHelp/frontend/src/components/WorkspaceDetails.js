import { useWorkspaceContext } from "../hooks/useWorkspaceContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkspaceDetails = ({ workspace }) => {
    const { dispatch } = useWorkspaceContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/workspaces/' + workspace._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKSPACE', payload: json})
        }
    }


    return (
        <div className="workspace-details">
            <h4>{workspace.companyName}</h4>
            <p><strong>Join Code: </strong>{workspace.joinCode}</p>
            <p>{workspace.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkspaceDetails