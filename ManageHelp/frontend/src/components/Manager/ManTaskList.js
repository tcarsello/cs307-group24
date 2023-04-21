import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuthContext } from "../../hooks/useAuthContext"

const getEmployeeDatas = async (workspace_id) => {
    const response = await fetch(`/api/employeedata/${workspace_id}`, {
      method: 'GET',
    });
  
    const json = await response.json();
    return json;
};

const TaskDetails = ({ t }) => {
    const tempdate = new Date(t.createdAt)
    const formattedDate = format(tempdate, "MM/dd/yyyy")
    let completion = "No"
    if (t.completed) {
        completion = "Yes"
    }

    return (
        <div className="workspace-details">
            <p><strong>Task: </strong>{t.text}</p>
            <p><strong>Assigned to: </strong>{t.assignedTo} on: {formattedDate}</p>
            <p><strong>Completed: </strong>{completion}</p>
        </div>
    )
}

export default function ManTaskList({wid}) {
    const [ employeeDatas, setEmployeeDatas ] = useState([]);

    useEffect(() => {
        getEmployeeDatas(wid).then((ed) => {
          setEmployeeDatas(ed);
        })
      }, [wid, setEmployeeDatas]);

    const tasks = []
    employeeDatas.forEach (d => {
        d.tasks.forEach(tk => {
            tasks.push(tk)
        })
    }) 
  
    return (
      <div>
        <div className="tasks">
          {tasks && tasks.map(task => (
            <TaskDetails t={task}
            key={task.createdAt} />
          ))}
        </div>
      </div>
    )
}