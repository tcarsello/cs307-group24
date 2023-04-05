import { useState } from 'react'

export default function MakeAnnouncement(wid, user) {
    const [mssg, setmssg] = useState('')
    const [pin, setPin] = useState(2)
    const [functionType, setFunctionType] = useState(-1)
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()

        if (functionType == -1) return
        let mode = functionType === 1 ? 'quiet' : 'notify'
        const bodyContent = {mssg, wid, mode, pin}
        console.log('wid: ' + wid)
        const response = await fetch(`/api/workspace/announce`, {
            method: 'POST',
            body :JSON.stringify(bodyContent),
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
          setIsSending(functionType == 1 ? 'Quiet Submit' : 'Notify Submit')
        }
        
    }

    return (
        <form id="submit-announcement-form" onSubmit={onSubmit}>
            <label>Announcement Text:</label>
            <input
                type="text"
                onChange={(e) => setmssg(e.target.value)}
            />
            
            <button type="submit" onClick={() => {setFunctionType(1)}}>Quiet Submit</button>
            <button className="submit-2-spaced" type="submit" onClick={() => {setFunctionType(2)}}>Notify Submit</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}