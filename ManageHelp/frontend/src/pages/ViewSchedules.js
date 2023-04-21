import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"
import ScheduleEmployeeComponent from '../components/Schedule/ScheduleEmployeeComponent'

export default function ViewSchedules () {

    const { id } = useParams()
    const { user } = useAuthContext()

    const [selectDate, setSelectDate] = useState(new Date())
    const [selectedSchedule, setSelectedSchedule] = useState(null)
    const [runUseEffect, setRunUseEffect] = useState('')

    useEffect(() => {

        // Runs ever time the user selects a new date

        fetch(`/api/schedule/workspace/${id}/${selectDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(json => {
                setSelectedSchedule(json)
            })
        })

    }, [selectDate, runUseEffect])

    const dateSelectOnClick = (e) => {
        e.preventDefault()
        setSelectDate(e.target.value)
    }

    const stepUpDate = async () => {
        document.getElementById('edit-schedules-date-input').stepUp(1)
        //setSelectDate(document.getElementById('edit-schedules-date-input').value)
        setSelectDate(document.getElementById('edit-schedules-date-input').value)
    }

    const stepDownDate = async () => {
        document.getElementById('edit-schedules-date-input').stepDown(1)
        //setSelectDate(document.getElementById('edit-schedules-date-input').value)
        setSelectDate(document.getElementById('edit-schedules-date-input').value)
    }

    return (
        <div id='edit-schedules-container'>
            <h1>View Schedules</h1>

            <label>Select Schedule Date:</label>
            <input id='edit-schedules-date-input' type="date" value={selectDate.toString()} onChange={dateSelectOnClick}/>
            <button className='fancy-button' onClick={stepDownDate}>Previous Day</button>
            <button className='fancy-button submit-2-spaced' onClick={stepUpDate}>Next Day</button>
            {(selectedSchedule && selectedSchedule)? <ScheduleEmployeeComponent schedule={selectedSchedule} user={user}/> : 
                <div>
                    <p>No schedule published for this date.</p>
                </div>
            }

        </div>
    )

}