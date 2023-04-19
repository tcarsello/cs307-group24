import ShiftViewComponent from './ShiftViewComponent'

export default function ScheduleEmployeeComponent ({schedule, user}) {

    return (
        <div id='schedule-employee-component-container'>
            
            {schedule.shift_list && schedule.shift_list.map(shift => (
                <ShiftViewComponent shift_id={shift} user={user}/>
            ))}
            {schedule.shift_list.length == 0 ? <p>No Shifts Yet</p>: null}

        </div>
    )

}