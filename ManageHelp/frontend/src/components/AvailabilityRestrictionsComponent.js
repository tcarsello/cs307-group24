import { useState, useEffect } from 'react'

const getUserInfo = async (email) => {

    const response = await fetch('/api/user/' + email, {
        method: 'GET',
    })
    const json = await response.json()
    return json

}

const AvailabilityRestrictionsComponent = ({user_email}) => {

    const [restrictions, setRestrictions] = useState('No Restrictions')
    const [reload, setReload] = useState('')

    const [isSending, setIsSending] = useState('')
    const [error, setError] = useState(null)

    const submitForm = async (e) => {

        e.preventDefault()
        
        const bodyContent = {restrictions: restrictions, email: user_email}
        const response = await fetch('/api/user/setrestrictions', {
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
            setIsSending('Scheduling Restrictions Updated')
        }

        setReload(json)

    }

    useEffect(() => {

        getUserInfo(user_email).then(u => {
            setRestrictions(u.restrictions)
            console.log(u.restrictions)
        })

    }, [reload])

    return (
        <div id='availability-restrictions-container'>
            <h1>Availability Restrictions</h1>
            <form id='availability-form' onSubmit={submitForm}>
                <input
                    type='text'
                    value={restrictions}
                    onChange={(e) => setRestrictions(e.target.value)}
                />
                <button type='submit'>Set Restrictions</button>
                {isSending && <div>{isSending}</div>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )

}

export default AvailabilityRestrictionsComponent