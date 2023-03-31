import { format } from 'date-fns';

const ScheduleDetails = ({ id, week }) => {

    const tempdate = new Date(week);
    const formattedDate = format(tempdate, "MM/dd/yyyy"); 


    return (
        <div className="workspace-details">
            <p><strong>Schedule ID: </strong>{id}</p>
            <p><strong>Week: </strong>{formattedDate}</p>
        </div>
    )
}

export default ScheduleDetails