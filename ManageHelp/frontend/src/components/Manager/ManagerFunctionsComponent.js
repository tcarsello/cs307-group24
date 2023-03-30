import ApproveRejectForm from './ApproveRejectForm'
import CreateScheduleForm from './CreateScheduleForm'

// context and effects
import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import ShiftRequestListForm from '../Workspace/EmployeeCoverList'
import DayOffList from '../Manager/DayOffList'
//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"

const ManagerFunctionsComponent = ({workspace, role, render_func}) => {
    return (
        <div id="manager-function-container">
            <h2>Manager Dashboard</h2>

            <Link className="fancy-button" to={"/EditSchedules/"+workspace._id}>Edit Schedules</Link>
            <br/>
            <br/>

            <Collapsible trigger={[<BsChevronDown />, " Day Off Requests in " + workspace.companyName]}>
                <DayOffList wid={workspace._id}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Approve/Reject a Day-Off Request"]}>
                <ApproveRejectForm/>
            </Collapsible>

        </div>
    )
}

export default ManagerFunctionsComponent