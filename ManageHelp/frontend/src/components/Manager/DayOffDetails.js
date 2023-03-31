import { format } from 'date-fns';

const DayOffDetails = ({ name, date, reason, status, id }) => {
    var formattedStatus = ""
    if (status == 0) {
        formattedStatus = "Pending"
    } else if (status == 1) {
        formattedStatus = "Accepted"
    } else {
        formattedStatus = "Rejected"
    }

    const tempdate = new Date(date);
    const formattedDate = format(tempdate, "MM/dd/yyyy");


    return (
        <div className="workspace-details">
            <p><strong>Request ID: </strong>{id}</p>
            <p><strong>Employee Name: </strong>{name}</p>
            <p><strong>Date Requested: </strong>{formattedDate}</p>
            <p><strong>Reason: </strong>{reason}</p>
            <p><strong>Status: </strong>{formattedStatus}</p>
        </div>
    )
}

export default DayOffDetails