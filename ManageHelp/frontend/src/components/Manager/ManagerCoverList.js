// TODO: Use the form to send an 
// email to the user that tells them that they have been requested to cover a shift for x person at y time
import React, { useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from 'react'
import { useManShiftContext } from "../../hooks/useManShiftContext"
import ShiftRequestDetails from '../Workspace/ShiftRequestDetails'

export default function ManagerCoverList ( { wid } ) {
  
  const [requests, setRequests] = useState([]);
  const { user } = useAuthContext()

  const { manshiftrequests, dispatch } = useManShiftContext()
 
  useEffect(() => {
    const fetchShiftRequest = async () => {
      const response = await fetch('/api/shiftrequest/manager/' + wid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_MANSHIFTREQUESTS', payload: json })
      }
    }

    if (user) {
      fetchShiftRequest()
    }
  }, [dispatch, user, wid])
  return (
    <div>
      <div className="shiftrequest">
        {manshiftrequests && manshiftrequests.map(shiftrequest => (
          <ShiftRequestDetails requesterName={shiftrequest.requesterName}
            id={shiftrequest._id}
            requestdate={shiftrequest.requestdate}
            accepteeName={shiftrequest.accepteeName}
            presentUser={user}
            status={shiftrequest.status}
            key={shiftrequest._id} />
        ))}
      </div>
    </div>
  );
}