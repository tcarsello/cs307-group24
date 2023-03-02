import { useState } from 'react'

export default function InviteUserForm({joinCode, spacename}) {

    const [invEmail, setEmail] = useState('')
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const sendInvite = async (e) => {

        e.preventDefault()

        const bodyContent = {email: invEmail, joincode: joinCode, workspaceName: spacename}

        const response = await fetch('/api/invite/', {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setIsSending('Invite Sent to: ' + invEmail)
        }

    }

    return (
        <form id="invite-user-form" onSubmit={sendInvite}>
            <h3>Invite an Employee</h3>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={invEmail}
            />
            <button type="submit">Send Invite</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}