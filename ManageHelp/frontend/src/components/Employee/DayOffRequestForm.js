import { useState } from 'react'

export default function DayOffRequestForm({workspace, user}) {

    const [date, setDate] = useState(new Date())
    const [reason, setReason] = useState('Why are you requesting off?')

    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const sendRequest = async (e) => {
        e.preventDefault()

        const bodyContent = {employee_email: user.email, workspace_id: workspace._id, date: date, reason: reason}

        const response = await fetch('/api/dor/', {
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
            setIsSending('Day off Requested for: ' + date)
        }

    }

    return (
        <form id="day-off-request-form" onSubmit={sendRequest}>
            <label>Date:</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />
            <label>Reason:</label>
            <input
                type="text"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
            />
            <button type="submit">Submit Request</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )

}