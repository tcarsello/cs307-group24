const ShiftrequestDetails = ({ presentUser, requesterName, accepteeName, requestdate }) => {
    var type = ""
    if (requesterName == presentUser.name) {
        type = "Outgoing"
    } else {
        type = "Incoming"
    }


    return (
        <div className="workspace-details">
            <p><strong>Type: </strong>{type}</p>
            <p><strong>Person Requesting: </strong>{requesterName}</p>
            <p><strong>Date to cover: </strong>{requestdate}</p>
            <p><strong>Name of Potential Acceptee: </strong>{accepteeName}</p>
        </div>
    )
}

export default ShiftrequestDetails