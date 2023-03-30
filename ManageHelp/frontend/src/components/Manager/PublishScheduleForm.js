import { useState } from 'react'

export default function PublishScheduleForm({workspace_id}) {

    const [scheduleID, setScheduleID] = useState('')
    const [functionType, setFunctionType] = useState(-1)
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()
        
        const flag = functionType == 2 ? false : true
        const bodyContent = { published: flag }

        const response = await fetch(`/api/schedule/${scheduleID}`, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setIsSending(functionType == 2 ? 'Un-Published Schedule' : 'Published Schedule')
        }

    }

    return (
        <form id="publish-schedule-form" onSubmit={onSubmit}>

            <label>Schedule ID:</label>
            <input
                type="text"
                onChange={(e) => setScheduleID(e.target.value)}
            />

            <button type="submit" onClick={() => {setFunctionType(1)}}>Publish</button>
            <button className="submit-2-spaced" type="submit" onClick={() => {setFunctionType(2)}}>Un-Publish</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}

        </form>
    )

}