import { useEffect } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"

// components
import WorkspaceDetails from "../components/WorkspaceDetails"
import CreateWorkspaceForm from "../components/CreateWorkspaceForm"
import UserInformationForm from "../components/UserInfomationForm"

const Settings = () => {
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
      <h1>Settings</h1>
        <h2>Change Username and Password</h2>
            <h3>Enter new username</h3>
                <form>
                <fieldset>
                    <input name="Name"/>
                </fieldset>
                <button type="submit">Submit</button>
                </form>
            <h3>Enter new password</h3>
                <form>
                <fieldset>
                    <input name="Name"/>
                </fieldset>
                <button type="submit">Submit</button>
                </form>
      </div>
      <UserInformationForm />
    </div>
  )
}

export default Settings
