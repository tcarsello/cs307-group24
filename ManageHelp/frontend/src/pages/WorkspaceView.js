import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"


import AdminFunctionsComponent from "../components/Admin/AdminFunctionsComponent"
import ManagerFunctionsComponent from '../components/Manager/ManagerFunctionsComponent'
import EmployeeFunctionsComponent from '../components/Employee/EmployeeFunctionsComponent'

const getWorkspace = async (id, user) => {

    const response = await fetch('/api/workspaces/' + id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()
    return json

}

const getUserInfo = async (email) => {

    const response = await fetch('/api/user/' + email, {
        method: 'GET',
    })
    const json = await response.json()
    return json

}

const getEmployeeData = async (user_id, workspace_id) => {

    //console.log(`/api/employeedata/${workspace_id}/${user_id}`)
    const response = await fetch(`/api/employeedata/${workspace_id}/${user_id}`, {
        method: 'GET',
    })

    const json = await response.json()
    return json

}

const WorkspaceView = () => {

    const {id} = useParams()
    const { user } = useAuthContext()

    const [workspace, setWorkspace] = useState('')
    const [employeeData, setEmployeeData] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const [roleString, setRoleString] = useState('Employee')

    const [runUseEffect, setRunUseEffect] = useState('')
    
    useEffect(() => {
            getWorkspace(id, user).then(w => {
                
                setWorkspace(w)
                getUserInfo(user.email).then(u => {
            
                    if (u._id === w.owner_id) {
                        setIsAdmin(true)
                        setIsManager(true)
                    }
                    
                    getEmployeeData(w._id, u._id). then(ed => {

                        setEmployeeData(ed)
                        if (u._id === w.owner_id) {
                            setRoleString('Admin')
                        } else {

                            w.manager_list.forEach(element => {
                                if (element === u._id) {
                                    setRoleString('Manager')
                                    setIsManager(true)
                                }
                            })

                        }

                    })

                })
            
            })
    }, [runUseEffect])


    return (
        <div id="container">
            <h1>{workspace.companyName} </h1>
            <h2>Join Code: {workspace.joinCode} | Your Role: {roleString}</h2>
            
            {employeeData ? <div><h5>Your Job Title: {employeeData.job_title}  |  Your Pay Rate: ${employeeData.pay_rate.toFixed(2)} / hr</h5></div> : null }

            {isAdmin ? <AdminFunctionsComponent workspace={workspace} render_func={setRunUseEffect}/> : null}
            {isManager ? <ManagerFunctionsComponent workspace={workspace} user={user} render_func={setRunUseEffect}/> : null}
            <EmployeeFunctionsComponent workspace={workspace} user={user} render_func={setRunUseEffect}/>
        </div>
    )

}

export default WorkspaceView