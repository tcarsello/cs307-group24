import { format } from 'date-fns';

const ShiftrequestDetails = ({ id, presentUser, requesterName, accepteeName, requestdate, status }) => {
    var type = ""
    if (requesterName == presentUser.name) {
        type = "Outgoing"
    } else {
        type = "Incoming"
    }
    var formattedStatus = ""
    if (status == 0) {
        formattedStatus = "Pending"
    } else if (status == 1) {
        formattedStatus = "Accepted by Colleague, Pending Manager Approval"
    } else if (status == 2) {
        formattedStatus = "Approved"
    } else {
        formattedStatus = "Rejected"
    }

    const date = new Date(requestdate);
    const formattedDate = format(date, "MM/dd/yyyy");


    return (
        <div className="workspace-details">
            <p><strong>Request ID: </strong>{id}</p>
            <p><strong>Type: </strong>{type}</p>
            <p><strong>Person Requesting: </strong>{requesterName}</p>
            <p><strong>Date to cover: </strong>{formattedDate}</p>
            <p><strong>Name of Potential Acceptee: </strong>{accepteeName}</p>
            <p><strong>Status: </strong>{formattedStatus}</p>
        </div>
    )
}

export default ShiftrequestDetails