import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"


import AdminFunctionsComponent from "../components/AdminFunctionsComponent"

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
    console.log(json)
    return json

}

const WorkspaceView = () => {

    const {id} = useParams()
    const { user } = useAuthContext()

    const [workspace, setWorkspace] = useState('')
    const [employeeData, setEmployeeData] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [runUseEffect, setRunUseEffect] = useState('')
    
    useEffect(() => {
            getWorkspace(id, user).then(w => {
                
                setWorkspace(w)
                getUserInfo(user.email).then(u => {
            
                    setIsAdmin(u._id === w.owner_id)
                    getEmployeeData(w._id, u._id). then(ed => {

                        setEmployeeData(ed)

                    })

                })
            
            })
    }, [runUseEffect])

    return (
        <div id="container">
            <h1>{workspace.companyName} (Join Code: {workspace.joinCode})</h1>
            
            {employeeData ? <div><h5>Job Title: {employeeData.job_title}</h5><h5>Pay Rate: ${employeeData.pay_rate.toFixed(2)} / hr</h5></div> : null }

            {isAdmin ? <AdminFunctionsComponent workspace={workspace} render_func={setRunUseEffect}/> : null}
        </div>
    )

}

export default WorkspaceView