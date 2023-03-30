import ApproveRejectForm from './ApproveRejectForm'
import ShiftRequestListForm from '../Workspace/EmployeeCoverList'
import DayOffList from '../Manager/DayOffList'
//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"

const ManagerFunctionsComponent = ({workspace, role, render_func}) => {
    return (
        <div id="manager-function-container">
            <h2>Manager Dashboard</h2>
            <Collapsible trigger={[<BsChevronDown />, " Day Off Requests in " + workspace.companyName]}>
                <DayOffList wid={workspace._id}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Approve/Reject a Day-Off Request"]}>
                <ApproveRejectForm/>
            </Collapsible>
            <br/>
            <button className='fancy-button' onClick={() => {alert('Yet to be implemented')}}>Create / Edit Schedules</button>
        </div>
    )
}

export default ManagerFunctionsComponent