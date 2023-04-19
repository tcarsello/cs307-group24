import { useState } from 'react'


export default function PublishScheduleForm({schedule_id, render_func}) {

    const [functionType, setFunctionType] = useState(-1)

    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()
        if (functionType != 1 && functionType != 2) return

        const flag = functionType == 2 ? false : true
        const bodyContent = { published: flag }

        const response = await fetch(`/api/schedule/${schedule_id}`, {
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
          render_func(json)
        }
        
    }

    return (
        <form id='publish-schedule-form' onSubmit={onSubmit}>
            <button type='submit' onClick={() => {setFunctionType(1)}}>Publish</button>
            <button type='submit' className='submit-2-spaced' onClick={() => {setFunctionType(2)}}>Un-Publish</button>
        </form>
    )

}