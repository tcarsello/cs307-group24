import ShiftViewComponent from "./ShiftViewComponent"

export default function ScheduleManagerComponent({schedule}) {

    return (

        <div id='schedule-manager-component'>

            <label>Published: {schedule.published ? "Yes" : "No"}</label>

            {schedule.shift_list && schedule.shift_list.map(shift => (
                <ShiftViewComponent shift_id={shift}/>
            ))}

        </div>

    )

}