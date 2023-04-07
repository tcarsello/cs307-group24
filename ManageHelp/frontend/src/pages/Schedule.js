import { format } from 'date-fns';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

const getWorkspace = async (id) => {

    const response = await fetch('/api/workspaces/' + id, {
        method: 'GET',
    })
    const json = await response.json()
    return json

}

const getSchedule = async (id) => {

    const response = await fetch('/api/schedule/workspace/' + id, {
        method: 'GET'
    })
    const json = await response.json()
    return json

}

const getShifts = async () => {

    const response = await fetch('/api/shift', {
        method: 'GET'
    })
    const json = await response.json()
    return json

}


const Schedule = () => {

    const {id} = useParams()
    const { user } = useAuthContext()

    const [workspace, setWorkspace] = useState('')
    const [schedule, setSchedule] = useState('')
    const [shifts, setShifts] = useState('')
    const [employeeData, setEmployeeData] = useState('')

    const [runUseEffect, setRunUseEffect] = useState('')


    useEffect(() => {
        getWorkspace(id).then(w => {

            setWorkspace(w)

            getSchedule(id).then(s => {
            
                console.log(s)

                getShifts(s).then(shs => {
                    shs.setShifts(s)
                    console.log(s)
                })
            })
    })

    }, [runUseEffect])

    return (
        <div id="container">
            <h1> {workspace.companyName} Schedule </h1>
            <table>
                <tr>
                    <th></th>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>

                </tr>

                    <tr>9:00 - 9:30</tr>
                    <tr>9:30 - 10:00</tr>
                    <tr>10:00 - 10:30</tr>
                    <tr>10:30 - 11:00</tr>
                    <tr>11:00 -11:30</tr>
                    <tr>11:30 - noon</tr>
                    <tr>noon - 12:30</tr>
                    <tr>12:30 - 1:00</tr>
                    <tr>1:00 - 1:30</tr>
                    <tr>1:30 - 2:00</tr>
                    <tr>2:00 - 2:30</tr>
                    <tr>2:30 - 3:00</tr>
                    <tr>3:00 - 3:30</tr>
                    <tr>3:30 - 4:00</tr>
                    <tr>4:00 - 4:30</tr>
                    <tr>4:30 - 5:00</tr>

                    
            </table>
        </div>
    )

}

export default Schedule