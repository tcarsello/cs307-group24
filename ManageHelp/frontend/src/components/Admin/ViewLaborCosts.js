import { useEffect, useState } from 'react';

const FetchAllEmployeesPayRate = async (workspace_id) => {
  var totallaborCost = 0;
  var totalHours = 0;


  const response = await fetch('/api/employeedata/' + workspace_id, {
    method: 'GET',
  })
  const employeesdata = await response.json()

  if (response.ok) {
    employeesdata.forEach(employee => {
      totallaborCost += (employee.pay_rate * employee.weekly_hours_worked)
      totalHours += employee.weekly_hours_worked
    })
  }

  return [totallaborCost - 10, totalHours - 10];
};

const EmployeesTotalCost = ({ workspace }) => {


  const [runUseEffect, setRunUseEffect] = useState('');
  const [weeklyLaborCost , setWeeklyLaborCost] = useState(0); // new state variable to keep track of total pay
  const [weeklyHours , setWeeklyHours] = useState(0); // new state variable to keep track of total hours
  useEffect(() => {
    FetchAllEmployeesPayRate(workspace).then((ed) => {
      setWeeklyLaborCost(ed[0]);
      setWeeklyHours(ed[1]);
    });
  }, [runUseEffect]);
  return (
    <div className="workspace-details">
      <p>
        <strong>Labor Cost: $</strong>
        {Math.round(weeklyLaborCost * 100)/100}
      </p>
      <p>
        <strong>Average Cost Per Labor Hour: $</strong>
        {Math.round((weeklyLaborCost/weeklyHours) *100)/100}
      </p>
      
    </div>
  );
};

export default EmployeesTotalCost;
