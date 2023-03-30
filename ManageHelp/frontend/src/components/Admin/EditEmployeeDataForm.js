import { useState } from 'react'

export default function EditEmployeeDataForm({workspace_id, render_func}) {

    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [payRate, setPayRate] = useState(0.00)

    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()

        const bodyContent = {email: email, workspace_id: workspace_id, job_title: jobTitle, pay_rate: payRate}

        const response = await fetch('/api/employeedata/update', {
            method: 'PATCH',
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
            setIsSending('Updated employee information for: ' + email)
        }

        render_func(json)

    }

    return (
        <form id="edit-employee-data-form" onSubmit={onSubmit}>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Job Title:</label>
            <input
                type="text"
                onChange={(e) => setJobTitle(e.target.value)}
            />
            <label>Pay Rate ($/hr):</label>
            <input
                type="number"
                onChange={(e) => setPayRate(e.target.value)}
            />
            <button type="submit">Update</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )

}