import { useEffect, useState } from 'react';
import ScheduleDetails from './ScheduleDetails';

const FetchAllSchedules = async (workspace_id) => {
    console.log("fetchall id: " + workspace_id)

  const response = await fetch('/api/schedule/workspace/' + workspace_id, {
    method: 'GET',
  })
  const scheduleArr = await response.json()

  if (response.ok) {
    console.log("schedule list response ok")
  }

  return scheduleArr;
};

const ScheduleList = ({ workspace }) => {
    console.log("schedulelist id: " + workspace)


  const [runUseEffect, setRunUseEffect] = useState('');
  const [schedules , setSchedules] = useState(null); // new state variable to keep track of total pay
  useEffect(() => {
    FetchAllSchedules(workspace).then((resp) => {
      setSchedules(resp)
    });
  }, [runUseEffect]);
  return (
    <div className="dayoffrequest">
        {schedules && schedules.map(sched => (
          <ScheduleDetails id={sched._id}
          week={sched.week_date}
            key={sched._id} />
        ))}
      </div>
  );
};

export default ScheduleList;
