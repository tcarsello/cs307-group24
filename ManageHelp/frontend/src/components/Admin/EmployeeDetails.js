import { useEffect, useState } from 'react';

const getEmployeeData = async (user_id, workspace_id) => {
  const response = await fetch(`/api/employeedata/${workspace_id}/${user_id}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json;
};

const EmployeeDetails = ({ workspace, employee }) => {
  const [employeeData, setEmployeeData] = useState('');
  const [runUseEffect, setRunUseEffect] = useState('');
  const weeklyHoursWorked = 5; //This will be coming the schedule
  const [weeklyLaborCost = 0, setWeeklyLaborCost] = useState(0); // new state variable to keep track of total pay


  let role = '';
  if (workspace.employee_list.includes(employee._id)) {
    role = 'Employee';
  } else if (workspace.manager_list.includes(employee._id)) {
    role = 'Manager';
  } else {
    role = 'Admin';
  }

  useEffect(() => {
    getEmployeeData(workspace._id, employee._id).then((ed) => {
      setEmployeeData(ed);
      
    });
  }, [runUseEffect]);

  const totalWeeklyPay = parseInt(weeklyHoursWorked) * parseInt(employeeData.pay_rate);

  return (
    <div className="workspace-details">
      <p>
        <strong>Name: </strong>
        {employee.name}
      </p>
      <p>
        <strong>Email: </strong>
        {employee.email}
      </p>
      <p>
        <strong>Role: </strong>
        {role}
      </p>
      <p>
        <strong>Job Title: </strong>
        {employeeData.job_title}
      </p>
      <p>
        <strong>Pay Rate: </strong>
        {employeeData.pay_rate}
      </p>
      <p>
        <strong>Scheduling Restrictions: </strong>
        {employee.restrictions}
      </p>
      <p>
        <strong>Hours Worked this Week: </strong>
        {weeklyHoursWorked}
      </p>
      <p>
        <strong>Total Weekly Pay: </strong>
        {totalWeeklyPay}
      </p>
      <p>
        <strong>Labor Cost: </strong>
        {weeklyLaborCost}
      </p>
    </div>
  );
};

export default EmployeeDetails;
