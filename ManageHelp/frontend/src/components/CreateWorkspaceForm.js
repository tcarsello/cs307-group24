import { useState } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"
import { useAuthContext } from "../hooks/useAuthContext"

const CreateWorkspaceForm = () => {
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

        const workspace = {companyName, joinCode}

        //submit workspace to be added to database with post request
        //need joincode to be updated before this
        const response = await fetch('/api/workspaces', {
            method: 'POST',
            body: JSON.stringify(workspace),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //reset fields to blank if submission worked
            setEmptyFields([])
            setError(null)
            setCompanyName('')
            setJoinCode('')
            //console.log('new workspace created', json)
            dispatch({type: 'CREATE_WORKSPACE', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Workspace</h3>

            <label>Company Name:</label>
            <input 
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                className={emptyFields.includes('companyName') ? 'error' : ''}
            />

            <label>Join Code:</label>
            <input 
                type="number" 
                onChange={(e) => setJoinCode(e.target.value)} 
                value={joinCode}
                className={emptyFields.includes('joinCode') ? 'error' : ''}
            />
            
            <button>Add Workspace</button>
            {error && <div className="error">{'63: ' + error}</div>}
        </form>
    )
    
}
export default CreateWorkspaceForm