// effect and context
import { useEffect } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkspaceDetails from "../components/Home/WorkspaceDetails"
import CreateWorkspaceForm from "../components/Home/CreateWorkspaceForm"
import JoinWorkspaceForm from "../components/Home/JoinWorkspaceForm"

const Home = () => {
  const { workspaces, dispatch } = useWorkspaceContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const response = await fetch('/api/workspaces', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_WORKSPACES', payload: json})
      }
    }

    if (user) {
      fetchWorkspaces()
    }
  }, [dispatch, user])

  return (
    <div className="home">
        <div className="workspaces">
        <h2>Workspaces</h2>
          {workspaces && workspaces.map(w => (
            <WorkspaceDetails workspace={w} key={w._id} />
          ))}
        </div>
        <div id="join-create">
          <CreateWorkspaceForm />
          <br/><br/>
          <JoinWorkspaceForm />
        </div>
      </div>
  )
}

export default Home