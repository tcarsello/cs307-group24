import React from 'react';
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from 'react'
import { useDayOffContext } from "../../hooks/useDayOffContext"
import DayOffDetails from './DayOffDetails'

export default function DayOffList( { wid } ) {
  const { user } = useAuthContext()

  const { dayoffs, dispatch } = useDayOffContext()
  useEffect(() => {
    const fetchDayOffs = async () => {
      const response = await fetch('/api/dor/' + wid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
   
        dispatch({ type: 'SET_DAYOFFS', payload: json })
      }
    }

    if (user) {
      fetchDayOffs()
    }
  }, [dispatch, user, wid])

  return (
    <div>
      <div className="dayoffrequest">
        {dayoffs && dayoffs.map(dayoff => (
          <DayOffDetails name={dayoff.employeeName}
          id={dayoff._id}
          date={dayoff.date}
          reason={dayoff.reason}
          status={dayoff.status}
            key={dayoff.status} />
        ))}
      </div>
    </div>
  );
}