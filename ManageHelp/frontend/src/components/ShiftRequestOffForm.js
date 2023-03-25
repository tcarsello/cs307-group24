// TODO: Use the form to send an 
// email to the user that tells them that they have been requested to cover a shift for x person at y time
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect } from 'react'


export default function ShiftCoverForm() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchShiftRequest = async () => {
      const response = await fetch('/api/shiftrequest/' + user.email, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      var shiftrequests = await response.json()
      console.log(shiftrequests)
      // Add request to state
      shiftrequests.map(shiftrequest => {
        console.log("test1000")
        console.log(shiftrequest.requestdate)
        setRequests([...requests, shiftrequest])
      })
        console.log("Test233")
      if (response.ok) {
        //dispatch({type: 'SET_EMPLOYEES', payload: json})
      }
    }

    if (user) {
      fetchShiftRequest()
    }

  }, [user])

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    // Get values from form inputs
    const date = e.target.elements.date.value;
    const email = e.target.elements.email.value;
    const request = { date, email };

    // Add request to state
    setRequests([...requests, request]);

    const requestshift = { user, date, email }

    //submit shift request to be added to database with post request
    //need joincode to be updated before this
    const response = await fetch('/api/shiftrequest/', {
      method: 'POST',
      body: JSON.stringify(requestshift),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }

    })
    const json = await response.json()
    console.log(json)
    if (!response.ok) {
      alert(json.error)
    }
    if (response.ok) {
      //reset fields to blank if submission worked
    }
  };

  const handleRemove = (index) => {
    // Remove request from state
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    setRequests(newRequests);
  };

  

  return (
    <div>
      <h2>Shift Cover Request</h2>
      <form onSubmit={handleRequestSubmit}>
        <h3>My Weekly Shifts:</h3>
        <h3>Request Employee to Cover:</h3>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" required />
        <br />
        <label htmlFor="email">Email of Employee Requested:</label>
        <input type="email" id="email" required />
        <br />
        <button type="submit">Request Shift Cover</button>
        
        
      </form>
      <hr />
      <h3>My Open Shift Cover Requests:</h3>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            {request.date} - {request.email}
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Other Employee's Shifts I Can Accept:</h3>
    </div>
  );
}

