import { useState } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function CreateTask({ ws }) {
    const [mssg, setmssg] = useState('')
    const [email, setEmail] = useState('')
    const wid = ws._id
    const { user } = useAuthContext()
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)
    //console.log('name top: ' + user.name) //doesn't work first time using a user account? have to signup then login again

    const onSubmit = async (e) => {

        e.preventDefault()

        const name = user.name
        const wid = ws._id
        const bodyContent = { mssg, email, name, wid }
        const response = await fetch(`/api/employeedata/addtask`, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setIsSending('Assigned')
        }
        
    }

    return (
        <form id="submit-announcement-form" onSubmit={onSubmit}>
            <label>Describe Task:</label>
            <input
                type="text"
                onChange={(e) => setmssg(e.target.value)}
            />
            <label>User to assign task's email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <button type="submit">Assign Task</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}