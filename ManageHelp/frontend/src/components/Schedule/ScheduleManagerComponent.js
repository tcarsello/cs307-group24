
export default function ScheduleManagerComponent({schedule}) {

    console.log(schedule.shift_list)

    return (

        <div id='schedule-manager-component'>

            <label>Published: {schedule.published ? "Yes" : "No"}</label>

            {schedule.shift_list && schedule.shift_list.map(shift => (
                <p>{shift}</p>
            ))}

        </div>

    )

}