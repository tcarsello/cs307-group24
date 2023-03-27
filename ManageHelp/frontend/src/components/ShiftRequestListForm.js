// TODO: Use the form to send an 
// email to the user that tells them that they have been requested to cover a shift for x person at y time
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect } from 'react'
import { useShiftrequestContext } from "../hooks/useShiftrequestContext"
import ShiftRequestDetails from './ShiftRequestDetails'


//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"

export default function ShiftRequestListForm() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuthContext()

  const { shiftrequests, dispatch } = useShiftrequestContext()

  useEffect(() => {
    const fetchShiftRequest = async () => {
      const response = await fetch('/api/shiftrequest/' + user.email, {
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
  }, [dispatch, user])


  return (
    <div>
      <Collapsible trigger={[<BsChevronDown />, "My Open Shift Cover Requests"]}>
        <div className="shiftrequest">
          <h3>Outgoing Shifts:</h3>
          {shiftrequests && shiftrequests.map(shiftrequest => (
            <ShiftRequestDetails requestmail={shiftrequest.requestemail}
              requestdate={shiftrequest.requestdate}
              key={shiftrequest._id} />
          ))}
        </div>
      </Collapsible>
    </div>
  );
}

