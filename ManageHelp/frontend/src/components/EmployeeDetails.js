const EmployeeDetails = ({ workspace, employee }) => {

    let role = ''
    if (workspace.employee_list.includes(employee._id)) {
        role = 'Employee'
    } else if (workspace.manager_list.includes(employee._id)) {
        role = 'Manager'
    } else {
        role = 'Undefined'
    }

    return (
        <div className="workspace-details">
            <p><strong>Email: </strong>{employee.email}</p>
            <p><strong>Role: </strong>{role}</p>
        </div>
    )
}

export default EmployeeDetails