import { useState } from 'react'

export default function MessageUserForm({joinCode, spacename}) {

    const [msgEmail, setEmail] = useState('')
    const [emailContents, setEmailContents] = useState('');
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const sendMessage = async (e) => {

        e.preventDefault()

        const bodyContent = {email: msgEmail, emailContents: emailContents}

        const response = await fetch('/api/message/', {
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
            setIsSending('Message sent to: ' + msgEmail)
        }

    }

    return (
        <form id="message-user-form" onSubmit={sendMessage}>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={msgEmail}
            />
            <label>Message:</label>
            <input 
                type="message"
                onChange={(e) => setEmailContents(e.target.value)}
                value={emailContents}
            />
            <button type="submit">Send Message</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}