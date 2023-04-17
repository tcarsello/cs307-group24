import { useState } from "react"
import { useWorkspaceContext } from "../../hooks/useWorkspaceContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const JoinWorkspaceForm = () => {
    const { dispatch } = useWorkspaceContext()
    const { user } = useAuthContext()
    const [email, setEmail] = useState('')

    const [joinCode, setJoinCode] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
        const bodyContent = {join_code: joinCode, user_email: email}
       
        const response = await fetch('/api/workspaces/' + joinCode +'/transfer', {
            method: 'PATCH',
            body :JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(json)

        // TODO: Handle response
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //reset fields to blank if submission worked
            setEmptyFields([])
            setError(null)
            setJoinCode('')
            //console.log('new workspace created', json)
            dispatch({type: 'CREATE_WORKSPACE', payload: json})
        }

    }

    return (
        <form className="join" onSubmit={handleSubmit}>
            <h3> </h3>
            <label>Join Code of Workspace to be Transferred to:</label>
            <input 
                type="number" 
                onChange={(e) => setJoinCode(e.target.value)} 
                value={joinCode}
                className={emptyFields.includes('joinCode') ? 'error' : ''}
            />
            <label>Email of user to transfer:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            
            <button>Transfer Workspace</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
    
}
export default JoinWorkspaceForm