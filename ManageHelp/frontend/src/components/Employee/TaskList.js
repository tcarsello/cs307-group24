import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuthContext } from "../../hooks/useAuthContext"

const getEmployeeData = async (user_id, workspace_id) => {
    const response = await fetch(`/api/employeedata/${workspace_id}/${user_id}`, {
      method: 'GET',
    });
  
    const json = await response.json();
    return json;
};

const markComplete = async (t, wid, user, tid) => {
    const cName = t.creatorName
    const uid = user._id
    console.log("user2: " + uid)
    const aName = t.assignedTo

    const bodyContent = { cName, wid, aName, tid }
    const response = await fetch(`/api/employeedata/markcomplete`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });
  
    const json = await response.json();
    return json;
};

const TaskDetails = ({ t, user, wid }) => {
    console.log(t.text + ": " + t.completed)
    console.log("user: " + user.name)
    const [complete, setComplete] = useState(t.completed)
    const tempdate = new Date(t.createdAt)
    const formattedDate = format(tempdate, "MM/dd/yyyy")

    return (
        <div className="workspace-details">
            <p><strong>Posted by: </strong>{t.creatorName} on: {formattedDate}</p>
            <p><strong>Task: </strong>{t.text}</p>
            <span className="material-symbols">
            <input
            type = "checkbox"
            value = "complete"
            onChange={(e) => {
                if (e.target.checked == true) {
                    setComplete(true)
                    markComplete(t, wid, user._id, t._id)
                } else {
                    setComplete(false)
                }
            }}
            style={{
                width: 30,
                height: 30
            }}
            />
            </span>
        </div>
    )
}

export default function TaskList({wid, user}) {
    const [ employeeData, setEmployeeData ] = useState('');

    useEffect(() => {
        getEmployeeData(user._id, wid).then((ed) => {
          setEmployeeData(ed);
        })
      }, [user, wid, setEmployeeData]);

    const tasks = employeeData.tasks
    console.log("tasks: " + tasks)
  
    return (
      <div>
        <div className="tasks">
          {tasks && tasks.map(task => (
            <TaskDetails t={task} wid={wid} user={user} 
            key={task.createdAt} />
          ))}
        </div>
      </div>
    )
}