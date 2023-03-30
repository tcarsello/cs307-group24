import { format } from 'date-fns';

const DayOffDetails = ({ name, date, reason, status, id }) => {
    var formattedReason = ""
    if (status == 0) {
        formattedReason = "Pending"
    } else if (status == 1) {
        formattedReason = "Accepted"
    } else {
        formattedReason = "Rejected"
    }

    const tempdate = new Date(date);
    const formattedDate = format(tempdate, "MM/dd/yyyy");


    return (
        <div className="workspace-details">
            <p><strong>Request ID: </strong>{id}</p>
            <p><strong>Employee Name: </strong>{name}</p>
            <p><strong>Date Requested: </strong>{formattedDate}</p>
            <p><strong>Reason: </strong>{reason}</p>
            <p><strong>Status: </strong>{formattedReason}</p>
        </div>
    )
}

export default DayOffDetails