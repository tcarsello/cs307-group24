import { useEffect } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"

// components
import WorkspaceDetails from "../components/WorkspaceDetails"
import CreateWorkspaceForm from "../components/CreateWorkspaceForm"

const Home = () => {
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
    <div className="home">
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

export default Home