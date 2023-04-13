import { useEffect, useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext"
import RemoveUserForm from './RemoveUserForm';


const getEmployeeData = async (user_id, workspace_id) => {
  const response = await fetch(`/api/employeedata/${workspace_id}/${user_id}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json;
};

const EmployeeDetailsTest = ({ workspace, employee, workspace_id, render_func}) => {
  const [employeeData, setEmployeeData] = useState('');
  const [runUseEffect, setRunUseEffect] = useState('');
  const [pointsTotal, setPointsTotal] = useState(parseInt(employeeData.points)); //State variable that holds the users total points
  const [newPoints, setNewPoints] = useState(0); //New points to be added
  const [managerNotes, setManagerNotes] = useState(""); //State variable to hold manager notes
  const weeklyHoursWorked = employeeData.weekly_hours_worked; //This will be coming the schedule
  const totalWeeklyPay = parseInt(weeklyHoursWorked) * parseInt(employeeData.pay_rate); //Calculation of total weekly pay
  const [showRemoveUserForm, setShowRemoveUserForm] = useState(false); //Conditional Rendering
  var employeeStanding = ""; //Varible for employee standing
  const [email, setEmail] = useState('') //Variable to hold email
  const [error, setError] = useState(null)
  const [isSending, setIsSending] = useState('')



  let role = '';
  if (workspace.employee_list.includes(employee._id)) {
    role = 'Employee';
  } else if (workspace.manager_list.includes(employee._id)) {
    role = 'Manager';
  } else {
    role = 'Admin';
  }

  //Conditional statements for employee standing
  if (pointsTotal < 5) {
    employeeStanding = "Good"
  }
  if (pointsTotal >= 5) {
    employeeStanding = "Not Good"
  }

  //Use effects to calulcate total points
  useEffect(() => {
    getEmployeeData(workspace._id, employee._id).then((ed) => {
      setEmployeeData(ed);
      setPointsTotal(ed.points);
    });
  }, [runUseEffect]);

  useEffect(() => {
    //console.log("Test1")
    setPointsTotal(pointsTotal => pointsTotal + newPoints);
    setNewPoints(0); // reset newPoints to 0 after updating pointsTotal
  }, [newPoints]);



  //Button click for adding points
  const handleAddPoints = async (e) => {
    employeeData.points = employeeData.points + 1
    e.preventDefault()
    //Test statments
    //console.log(employee._id)
    //console.log(employee.email)
    //console.log(employeeData.workspace_id)
    const bodyContent = { email: employee.email, workspace_id: employeeData.workspace_id, points: employeeData.points }

    //API Call
    const response = await fetch('/api/employeedata/updatePoints', {
      method: 'PATCH',
      body: JSON.stringify(bodyContent),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    //Conditional statements for when the user goes over a certain amount of points
    //render_func(json)
    if (pointsTotal === 5) {
      alert('User has exceeded 5 points!');
      // Send warning email
    }
    if (pointsTotal === 10) {
      alert('User has exceeded 10 points!')
    }
    if (pointsTotal === 15) {
      alert('User has exceeded 15 point company limit and will now be removed from the workspace.')
      alert("Remove user?")
      setShowRemoveUserForm(true);
    }
    setNewPoints(1);
  };

  //Button click for subtracting points
  const handleSubtractPoints = async (e) => {
    employeeData.points = employeeData.points - 1
    e.preventDefault()

    const bodyContent = { email: employee.email, workspace_id: employeeData.workspace_id, points: employeeData.points  }

    //API Call
    const response = await fetch('/api/employeedata/updatePoints', {
      method: 'PATCH',
      body: JSON.stringify(bodyContent),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    setNewPoints(-1);
  };

  return (
    <div className="workspace-details">
      <p><strong>Name: </strong>{employee.name}</p>
      <p><strong>Email: </strong>{employee.email}</p>
      <p><strong>Role: </strong>{role}</p>
      <p><strong>Job Title: </strong>{employeeData.job_title}</p>
      <p><strong>Pay Rate: </strong>{employeeData.pay_rate}</p>
      <p><strong>Scheduling Restrictions: </strong>{employee.restrictions}</p>
      <p><strong>Hours Worked this Week: </strong>{weeklyHoursWorked}</p>
      <p><strong>Total Weekly Pay: </strong>{totalWeeklyPay}</p>
      <p>
        <strong>Points: </strong>
        {pointsTotal}
        <strong> </strong>
        <button onClick={handleAddPoints}>Add</button>
        {isSending && <div>{isSending}</div>}
        {error && <div className='error'>{error}</div>}
        <button onClick={handleSubtractPoints}>Subtract</button>
        {isSending && <div>{isSending}</div>}
        {error && <div className='error'>{error}</div>}
      </p>
      {pointsTotal > 15 && (<RemoveUserForm workspaceID={workspace._id} />)}

      <p><strong>Employee Standing: </strong>{employeeStanding}</p>
    </div>
  );
};

export default EmployeeDetailsTest;