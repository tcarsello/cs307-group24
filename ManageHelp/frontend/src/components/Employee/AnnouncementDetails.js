import { format } from 'date-fns';

const AnnouncmentDetails = ({ creatorName, date, text }) => {
    const tempdate = new Date(date);
    const formattedDate = format(tempdate, "MM/dd/yyyy");

    return (
        <div className="workspace-details">
            <p><strong>Posted by: </strong>{creatorName} on: {formattedDate}</p>
            <p><strong>Text: </strong>{text}</p>
        </div>
    )
}

export default AnnouncmentDetails