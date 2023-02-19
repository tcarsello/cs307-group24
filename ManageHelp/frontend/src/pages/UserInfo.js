import { useEffect } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"

// components
import WorkspaceDetails from "../components/WorkspaceDetails"
import CreateWorkspaceForm from "../components/CreateWorkspaceForm"

const userInfoPage = () => {
    const { workspaces, dispatch } = useWorkspaceContext()
  
    useEffect(() => {
      const fetchWorkspaces = async () => {
        const response = await fetch('/api/workspaces')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_WORKSPACES', payload: json})
        }
      }
  
      fetchWorkspaces()
    }, [dispatch])
  
    return (
      <div className="User Information">
        <div className="workspaces">
        <h2>User Dashboard</h2>
          {workspaces && workspaces.map(workspace => (
            <WorkspaceDetails workspace={workspace} key={workspace._id} />
          ))}
        </div>
        <CreateWorkspaceForm />
      </div>
    )
  }
  
  export default userInfoPage