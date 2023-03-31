import { useEffect, useState } from 'react';

const FetchAllEmployeesPayRate = async (workspace_id) => {
  var totallaborCost = 0;


  const response = await fetch('/api/employeedata/' + workspace_id, {
    method: 'GET',
  })
  const employeesdata = await response.json()

  if (response.ok) {
    employeesdata.forEach(employee => {
      totallaborCost += (employee.pay_rate * employee.weekly_hours_worked)
      console.log("id: " + employee.user_id)
    })
    /*
    employeesdata && employeesdata.map(employeedata => (
      totallaborCost += (employeedata.pay_rate * employeedata.weekly_hours_worked)
      console.log("id: " + employeedata.user_id)
    )) */
  }

  return totallaborCost - 10;
};

const EmployeesTotalCost = ({ workspace }) => {


  const [runUseEffect, setRunUseEffect] = useState('');
  const [weeklyLaborCost , setWeeklyLaborCost] = useState(0); // new state variable to keep track of total pay

  useEffect(() => {
    FetchAllEmployeesPayRate(workspace).then((ed) => {
      setWeeklyLaborCost(ed);

    });
  }, [runUseEffect]);
  return (
    <div className="workspace-details">
      <p>
        <strong>Labor Cost: $</strong>
        {weeklyLaborCost}
      </p>
      <p>
        <strong>Average Cost Per Labor Hour: $</strong>
        {weeklyLaborCost/7}
      </p>
      
    </div>
  );
};

export default EmployeesTotalCost;
