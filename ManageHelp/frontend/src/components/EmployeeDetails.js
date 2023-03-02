import { useEffect, useState } from 'react'

const getEmployeeData = async (user_id, workspace_id) => {

    //console.log(`/api/employeedata/${workspace_id}/${user_id}`)
    const response = await fetch(`/api/employeedata/${workspace_id}/${user_id}`, {
        method: 'GET',
    })

    const json = await response.json()
    return json

}

const EmployeeDetails = ({ workspace, employee }) => {
    const [employeeData, setEmployeeData] = useState('')
    const [runUseEffect, setRunUseEffect] = useState('')

    let role = ''
    if (workspace.employee_list.includes(employee._id)) {
        role = 'Employee'
    } else if (workspace.manager_list.includes(employee._id)) {
        role = 'Manager'
    } else {
        role = 'Admin'
    }

    useEffect(() => {
        getEmployeeData(workspace._id, employee._id). then(ed => {
            setEmployeeData(ed)
        })
    }, [runUseEffect])

    return (
        <div className="workspace-details">
            <p><strong>Email: </strong>{employee.email}</p>
            <p><strong>Role: </strong>{role}</p>
            <p><strong>Job Title: </strong>{employeeData.job_title}</p>
            <p><strong>Pay Rate: </strong>{employeeData.pay_rate}</p>
        </div>
    )
}

export default EmployeeDetails