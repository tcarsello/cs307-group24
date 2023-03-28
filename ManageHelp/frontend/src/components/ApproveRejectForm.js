import { useState } from 'react'

export default function ApproveRejectForm() {

    const [id, setID] = useState('')
    const [functionType, setFunctionType] = useState(-1)
    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {

        e.preventDefault()

        if (functionType == -1) return
        let mode = functionType === 1 ? 'approve' : 'reject'

        const response = await fetch(`/api/dor/${mode}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()
        console.log(json)

        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setIsSending(functionType == 1 ? 'Approved Request' : 'Rejected Request')
        }
        
    }

    return (
        <form id="approve-reject-dor-form" onSubmit={onSubmit}>
            <label>Request ID:</label>
            <input
                type="text"
                onChange={(e) => setID(e.target.value)}
            />
            <button type="submit" onClick={() => {setFunctionType(1)}}>Approve Request</button>
            <button className="submit-2-spaced" type="submit" onClick={() => {setFunctionType(2)}}>Reject Request</button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}