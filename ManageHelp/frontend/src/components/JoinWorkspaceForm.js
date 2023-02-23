import { useState } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"
import { useAuthContext } from "../hooks/useAuthContext"

const JoinWorkspaceForm = () => {
    const { dispatch } = useWorkspaceContext()
    const { user } = useAuthContext()

    const [companyName, setCompanyName] = useState('')
    const [joinCode, setJoinCode] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const bodyContent = {join_code: joinCode}
        const response = await fetch('/api/workspaces/' + joinCode, {
            method: 'POST',
            body :JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = response.json()
        
        // TODO: Handle response

    }

    return (
        <form className="join" onSubmit={handleSubmit}>
            <h3>Join a Workspace</h3>
            <label>Join Code:</label>
            <input 
                type="number" 
                onChange={(e) => setJoinCode(e.target.value)} 
                value={joinCode}
                className={emptyFields.includes('joinCode') ? 'error' : ''}
            />
            
            <button>Join Workspace</button>
            {error && <div className="error">{'63: ' + error}</div>}
        </form>
    )
    
}
export default JoinWorkspaceForm