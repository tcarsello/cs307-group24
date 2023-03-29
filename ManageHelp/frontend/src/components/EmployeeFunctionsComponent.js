// Forms
import DayOffRequestForm from './DayOffRequestForm'
import ShiftRequestOffForm from './ShiftRequestOffForm'
import ShiftRequestListForm from './ShiftRequestListForm'

// context and effects
import { useEffect } from 'react'
import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useAuthContext } from "../hooks/useAuthContext"

//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"

const EmployeeFunctionsComponent = ({workspace, user, render_func}) => {
    console.log("employee func ws: " + workspace._id)
    return (
        <div id="employee-functions-container">
            <h2>Employee Dashboard</h2>

            <Collapsible trigger={[<BsChevronDown />, " Submit a Day-Off Request"]}>
                <DayOffRequestForm workspace={workspace} user={user}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Submit a Shift Cover Request"]}>
                <ShiftRequestOffForm workspace={workspace}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, "My Open Shift Cover Requests"]}>
                <ShiftRequestListForm wid={workspace._id}/>
            </Collapsible>
        </div>
    )
}

export default EmployeeFunctionsComponent