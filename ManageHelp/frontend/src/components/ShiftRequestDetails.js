import { useEffect, useState } from 'react'

const getUserData = async (requestmail2 ) => {

    const response = await fetch(`/api/user/${requestmail2}`, {    
        method: 'GET',
    })

    const json = await response.json()
    return json

}

const ShiftrequestDetails = ({ requestmail, requestdate }) => {

    const [userData, setUserData] = useState('')
    const [runUseEffect, setRunUseEffect] = useState('')

    useEffect(() => {
        getUserData(requestmail). then(ed => {
            setUserData(ed)
        })
    }, [runUseEffect])

    return (
        <div className="workspace-details">
            <p><strong>Name: </strong>{userData.name}</p>
            <p><strong>Requested Date: </strong>{requestdate}</p>
            <p><strong>Email: </strong>{userData.email}</p>
        </div>
    )
}

export default ShiftrequestDetails