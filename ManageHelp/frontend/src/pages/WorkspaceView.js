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

const WorkspaceView = () => {

    const {id} = useParams()
    const { user } = useAuthContext()

    const [workspace, setWorkspace] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [runUseEffect, setRunUseEffect] = useState('')
    
    useEffect(() => {
            getWorkspace(id, user).then(w => {
                setWorkspace(w)
                getUserInfo(user.email).then(u => {
                    setIsAdmin(u._id === w.owner_id)
                })
            })
    }, [runUseEffect])

    return (
        <div id="container">
            <h1>{workspace.companyName}</h1>
            <h6>Join Code: {workspace.joinCode}</h6>
            {isAdmin ? <AdminFunctionsComponent workspace={workspace} render_func={setRunUseEffect}/> : null}
        </div>
    )

}

export default WorkspaceView