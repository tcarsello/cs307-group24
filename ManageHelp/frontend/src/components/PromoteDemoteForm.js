import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export default function PromoteDemoteForm({workspace_id, render_func}) {

    const { user } = useAuthContext()

    const [email, setEmail] = useState('')
    const [functionType, setFunctionType] = useState(-1)
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()
        
        let request = null, request_content = null, bodyContent = null;
        if (functionType == 1) {
            request = `/api/workspaces/${workspace_id}/promote`
        } else if (functionType == 2) {
            request = `/api/workspaces/${workspace_id}/demote`
        }

        bodyContent = {
            email: email
        }

        request_content = {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }

        const response = await fetch(request, request_content)
        const json = response.json()
        console.log(json)

        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setIsSending(functionType == 1 ? 'Promoted User' : 'Demoted User')
        }

        render_func(json)

    }

    return (
        <form id="promote-demote-form" onSubmit={onSubmit}>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <button type="submit" onClick={() => {setFunctionType(1)}}>Promote to Manager</button>
            <button className="submit-2-spaced" type="submit" onClick={() => {setFunctionType(2)}}>Demote to Employee</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )

}