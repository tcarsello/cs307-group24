import { useState } from 'react'

export default function InviteUserForm({joinCode}) {

    const [invEmail, setEmail] = useState('')

    const sendInvite = async (e) => {

        e.preventDefault()

        const bodyContent = {email: invEmail, joincode: joinCode}

        const response = await fetch('/api/invite/', {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        const json = await response.json()
        console.log(json)

    }

    return (
        <form id="invite-user-form" onSubmit={sendInvite}>
            <h5>Invite an Employee</h5>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={invEmail}
            />
            <button type="submit">Send Invite</button>
        </form>
    )

}