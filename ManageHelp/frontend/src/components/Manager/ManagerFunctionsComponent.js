import ApproveRejectForm from './ApproveRejectDayOff'
import ApproveRejectTradeForm from './ApproveShiftTrade'
import CreateScheduleForm from './CreateScheduleForm'
import AnnouncementForm from './AnnouncementForm'

// context and effects
import { useEffect } from 'react'

import { Link } from 'react-router-dom'

//import ShiftRequestListForm from '../Workspace/EmployeeCoverList'
import DayOffList from '../Manager/DayOffList'
import ManagerCoverList from './ManagerCoverList'
//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"
import MessageUserForm from './MessageUserForm'

const ManagerFunctionsComponent = ({workspace, user, render_func}) => {

    return (
        <div id="manager-function-container">
            <h2>Manager Dashboard</h2>

            <Link className="fancy-button" to={"/EditSchedules/"+workspace._id}>Edit Schedules</Link>
            <br/>
            <br/>

            <Collapsible trigger={[<BsChevronDown />, " Message an Employee"]}>
            <MessageUserForm joinCode={workspace.joinCode} spacename={workspace.companyName}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Day Off Requests in " + workspace.companyName]}>
                <DayOffList wid={workspace._id}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Approve/Reject a Day-Off Request"]}>
                <ApproveRejectForm/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, "Open Shift Trade Requests in " + workspace.companyName]}>
                <ManagerCoverList wid={workspace._id}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Approve/Reject a Trade Request"]}>
                <ApproveRejectTradeForm/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Post Announcement"]}>
                <AnnouncementForm ws={workspace}/>
            </Collapsible>

        </div>
    )
}

export default ManagerFunctionsComponent