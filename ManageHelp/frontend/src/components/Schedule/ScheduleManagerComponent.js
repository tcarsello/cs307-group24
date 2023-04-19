import ShiftViewComponent from "./ShiftViewComponent"
import CreateShiftForm from "./CreateShiftForm"
import PublishScheduleForm from '../Manager/PublishScheduleForm'

import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"

export default function ScheduleManagerComponent({schedule, render_func}) {

    return (

        <div id='schedule-manager-component'>

            <label>Published: {schedule.published ? "Yes" : "No"}</label>

            {schedule.shift_list && schedule.shift_list.map(shift => (
                <ShiftViewComponent shift_id={shift}/>
            ))}
            {schedule.shift_list.length == 0 ? <p>No Shifts Yet</p>: null}

            <Collapsible trigger={[<BsChevronDown />, " Create a Shift"]}>
                <CreateShiftForm schedule={schedule} render_func={render_func}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Publish / Un-publish Schedule"]}>
                <PublishScheduleForm schedule_id={schedule._id} render_func={render_func}/>
            </Collapsible>

        </div>

    )

}