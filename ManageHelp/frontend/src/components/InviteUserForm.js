import { useState } from 'react'

export default function InviteUserForm({joinCode}) {

    const [email, setEmail] = useState('')

    const sendInvite = async (e) => {

        console.log('test')
        
        const response = await fetch('/api/invite', {
            method: 'POST',
            body: {
                email: email,
                joincode: joinCode
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
                value={email}
            />
            <button type="submit">Send Invite</button>
        </form>
    )

}