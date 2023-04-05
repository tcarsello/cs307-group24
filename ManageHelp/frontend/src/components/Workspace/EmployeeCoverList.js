// TODO: Use the form to send an 
// email to the user that tells them that they have been requested to cover a shift for x person at y time
import React, { useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from 'react'
import { useShiftrequestContext } from "../../hooks/useShiftrequestContext"
import ShiftRequestDetails from './ShiftRequestDetails'

export default function EmployeeCoverList ( { wid } ) {
  const { user } = useAuthContext()

  const { empshiftrequests, dispatch } = useShiftrequestContext()
 
  useEffect(() => {
    const fetchShiftRequest = async () => {
      const response = await fetch('/api/shiftrequest/employee/' + user.email + '/' + wid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_EMPSHIFTREQUESTS', payload: json })
      }
    }

    if (user) {
      fetchShiftRequest()
    }
  }, [dispatch, user, wid])
  return (
    <div>
      <div className="shiftrequest">
        {empshiftrequests && empshiftrequests.map(shiftrequest => (
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