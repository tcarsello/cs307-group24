import { useState } from 'react'

export default function CreateScheduleForm({workspace_id}) {

    const [date, setDate] = useState(new Date())
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit= async (e) => {
        
        e.preventDefault()

        const bodyContent = {workspace_id: workspace_id, week_date: date, published: false}
        const response = await fetch(`/api/schedule/`, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        const json = await response.json()

        if (!response.ok) {
            setError(response.error)
        }
        if (response.ok) {
            setIsSending('Created Schedule')
        }

    }

    return (
        <form id='create-schedule-form' onSubmit={onSubmit}>

            <label>Week Start Date:</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />
            <button type="submit">Create Schedule</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}

        </form>
    )

}