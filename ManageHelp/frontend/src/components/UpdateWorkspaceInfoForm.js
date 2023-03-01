import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export default function UpdateWorkspaceInfoForm({id, joinCode, workspaceName, render_func}) {
    
    const { user } = useAuthContext()

    const [newName, setNewName] = useState(workspaceName)
    const [newJoinCode, setNewJoinCode] = useState(joinCode)
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {
         
        e.preventDefault()
        
        const bodyContent = {
            joinCode: newJoinCode,
            companyName: newName
        }

        const response = await fetch('/api/workspaces/' + id, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setIsSending('Info Updated')
        }

        render_func(json) // Tell react to re-render

    } 

    return (
        <form id="update-workspace-form" onSubmit={onSubmit}>
            <h5>Update Workspace Information</h5>
            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
            />
            <label>Join Code:</label>
            <input 
                type="number"
                onChange={(e) => setNewJoinCode(e.target.value)}
                value={newJoinCode}
            />
            <button type="submit">Update</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )

}