import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export default function RemoveUserForm({workspaceID, render_func}) {

    const { user } = useAuthContext()

    const [email, setEmail] = useState('')
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const removeUser = async (e) => {

        e.preventDefault()

        const bodyContent = { email: email }
        const response = await fetch(`/api/workspaces/remove/${workspaceID}`, {
            method: 'DELETE',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }

        })

        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setError(json.error)
          }
          if (response.ok) {
            setError(null)
            setIsSending('Removed User')
          }

        render_func(json)

    }

    return (
        <form id="remove-user-form" onSubmit={removeUser}>
            <h3>Remove a User From This Workspace</h3>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <button type="submit">Remove User</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )

}