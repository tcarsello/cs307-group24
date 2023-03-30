// TODO: Use the form to send an 
// email to the user that tells them that they have been requested to cover a shift for x person at y time
import React, { useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from 'react'
import { useShiftrequestContext } from "../../hooks/useShiftrequestContext"
import ShiftRequestDetails from './ShiftRequestDetails'

export default function ShiftRequestListForm( { wid, role } ) {
  
  const [requests, setRequests] = useState([]);
  const { user } = useAuthContext()

  const { shiftrequests, dispatch } = useShiftrequestContext()
  var newRole = "Employee"
  if (role == "Admin" || role == "Manager") {
    newRole = "Manager"
  }
  console.log("Cover List wid: " + wid)
  console.log("Cover list role: " + newRole)
  useEffect(() => {
    const fetchShiftRequest = async () => {
      const response = await fetch('/api/shiftrequest/Employee/' + user.email + '/' + wid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_SHIFTREQUESTS', payload: json })
      }
    }

    if (user) {
      fetchShiftRequest()
    }
  }, [dispatch, user, wid, newRole])

  return (
    <div>
      <div className="shiftrequest">
        {shiftrequests && shiftrequests.map(shiftrequest => (
          <ShiftRequestDetails requesterName={shiftrequest.requesterName}
            requestdate={shiftrequest.requestdate}
            accepteeName={shiftrequest.accepteeName}
            presentUser={user}
            key={shiftrequest._id} />
        ))}
      </div>
    </div>
  );
}