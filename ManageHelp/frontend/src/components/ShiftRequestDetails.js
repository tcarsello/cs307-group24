import { useEffect, useState } from 'react'
import { format } from 'date-fns';


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
    const date = new Date(requestdate);
    const formattedDate = format(date, "MM/dd/yyyy");
    return (
        <div className="workspace-details">
            
            <p><strong>Person Requesting: </strong>{userData.name}</p>
            <p><strong>Date to cover: </strong>{formattedDate}</p>
            <p><strong>Email: </strong>{userData.email}</p>
        </div>
    )
}

export default ShiftrequestDetails