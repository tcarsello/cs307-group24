import { useState } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function MakeAnnouncement({ ws }) {
    const [mssg, setmssg] = useState('')
    const wid = ws._id
    const { user } = useAuthContext()
    const [pin, setPin] = useState(2)
    const [functionType, setFunctionType] = useState(-1)
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)
    //console.log('name top: ' + user.name) //doesn't work first time using a user account? have to signup then login again

    const onSubmit = async (e) => {

        e.preventDefault()

        if (functionType == -1) return
        let mode = functionType === 1 ? 'quiet' : 'notify'
        const bodyContent = {mssg, wid, mode, pin}
        console.log('mssg: ' + mssg)
        console.log('wid: ' + wid)
        console.log('mode: ' + mode)
        console.log('pin: ' + pin)
        const response = await fetch(`/api/workspaces/announce/${wid}`, {
            method: 'POST',
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