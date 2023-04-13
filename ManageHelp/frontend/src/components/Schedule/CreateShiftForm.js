import { useState } from 'react'

export default function CreateShiftForm({schedule, render_func}) {

    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const [email, setEmail] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [role, setRole] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()

        const bodyContent = {
            employee_email: email,
                workspace_id: schedule.workspace_id,
                schedule_id: schedule._id,
                start_time: startTime,
                end_time: endTime,
                role: role,
                published: true
        }
        //console.log(bodyContent)

        const response = await fetch(`/api/shift/`, {
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
            setIsSending('Shift created!')
            render_func(json)
        }

    }

    return (
        <form id='create-shift-form' onSubmit={onSubmit}>
        
            <label>Employee Email:</label>
            <input type="text" onChange={e => setEmail(e.target.value)}/>

            <label>Start Time:</label>
            <input type="time" onChange={e => setStartTime(e.target.valueAsDate)}/>
            
            <label>End Time:</label>
            <input type="time" onChange={e => setEndTime(e.target.valueAsDate)}/>

            <label>Role:</label>
            <input type="text" onChange={e => setRole(e.target.value)}/>

            <button type="submit">Post Shift</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}

        </form>
    )

} 