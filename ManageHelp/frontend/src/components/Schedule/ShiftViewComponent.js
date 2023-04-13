import { useState, useEffect } from 'react'

export default function ShiftViewComponent({shift_id}) {

    const [shift, setShift] = useState(null)
    const [employee, setEmployee] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    useEffect(() => {

        if (!shift) {
            fetch(`/api/shift/${shift_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(reponse => {
                reponse.json().then(json => {
                    
                    setShift(json)

                })

            })

        } else {
            setStartTime(new Date(shift.start_time))
            setEndTime(new Date(shift.end_time))

            fetch(`/api/user/id/${shift.employee_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(user_response => {
                user_response.json().then(urj => {
                    setEmployee(urj)
                })
            })
        }

    }, [shift])

    return (
        
        <div className='shift-view-component'>
        
            {shift && <p>Shift ID: {shift._id}</p>}
            {employee && <p>Employee: {employee.email}</p>}
            {startTime && <p>Start Time: {startTime.toTimeString()}</p>}
            {endTime && <p>End Time: {endTime.toTimeString()}</p>}
        
        </div>

    )

}