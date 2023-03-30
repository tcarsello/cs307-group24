import { useState } from 'react'

export default function AddShiftForm({workspace_id}) {

    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const [schedule_id, setScheduleID] = useState('')
    const [employee_email, setEmployeeEmail] = useState('')
    const [shiftDate, setShiftDate] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [role, setRole] = useState('Ex: Cashier')

    const onSubmit = async (e) => {

        e.preventDefault()

        const bodyContent = {
            employee_email: employee_email,
            workspace_id: workspace_id,
            schedule_id: schedule_id,
            date: shiftDate,
            start_time: startTime,
            end_time: endTime,
            role: role,
            published: true
        }

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
        }

    }

    return (
        <form id='add-shift-form' onSubmit={onSubmit}>
            <label>Schedule ID:</label>
            <input
                type="text"
                onChange={e => setScheduleID(e.target.value)}
            />
            <label>Employee Email:</label>
            <input
                type="text"
                onChange={e => setEmployeeEmail(e.target.value)}
            />
            <label>Date:</label>
            <input
                type="date"
                onChange={e => setShiftDate(e.target.valueAsDate)}
            />
            <label>Shift Start Time:</label>
            <input
                type="time"
                onChange={e => setStartTime(e.target.valueAsDate)}
            />
            <label>Shift End Time:</label>
            <input
                type="time"
                onChange={e => setEndTime(e.target.valueAsDate)}
            />
            <label>Role Description:</label>
            <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
            />

            <button type="submit">Add Shift to Schedule</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )

} 