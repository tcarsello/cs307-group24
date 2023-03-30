import ApproveRejectForm from './ApproveRejectForm'
import ShiftRequestListForm from '../Workspace/ShiftRequestListForm'
//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"

const ManagerFunctionsComponent = ({workspace, render_func}) => {
    return (
        <div id="manager-function-container">
            <h2>Manager Dashboard</h2>
            <Collapsible trigger={[<BsChevronDown />, " Approve/Reject a Day-Off Request"]}>
                <ApproveRejectForm/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Open Shift Trades in " + workspace.companyName]}>
                <ShiftRequestListForm wid={workspace._id} role={"man"}/>
            </Collapsible>
            <br/>
            <button className='fancy-button' onClick={() => {alert('Yet to be implemented')}}>Create / Edit Schedules</button>
        </div>
    )
}

export default ManagerFunctionsComponent