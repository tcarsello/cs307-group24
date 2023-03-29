// Forms
import DayOffRequestForm from './DayOffRequestForm'

// context and effects
import { useEffect } from 'react'
import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useAuthContext } from "../hooks/useAuthContext"
import '../index.css';
import { Link } from 'react-router-dom'

//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"
import Schedule from '../pages/Schedule'


const EmployeeFunctionsComponent = ({workspace, user, render_func}) => {

    return (
        <div id="employee-functions-container">
            <h2>Employee Dashboard</h2>


            <Link className="fancy-button" to={"/Schedule/"+workspace._id}>View Schedules</Link>
            <br></br>

            <br></br>
            <Collapsible trigger={[<BsChevronDown />, " Submit a Day-Off Request"]}>
                <DayOffRequestForm workspace={workspace} user={user}/>
            </Collapsible>
            
        </div>
    )

}

export default EmployeeFunctionsComponent