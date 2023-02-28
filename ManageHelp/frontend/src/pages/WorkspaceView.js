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
    const [userInfo, setUserInfo] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(() => {
            getWorkspace(id, user).then(w => {
                setWorkspace(w)
                getUserInfo(user.email).then(u => {
                    setUserInfo(u)
                    setIsAdmin(u._id === w.owner_id)
                })
            })
    }, [workspace, id, user])

    return (
        <div id="container">
            <h1>{workspace.companyName}</h1>
            {isAdmin ? <AdminFunctionsComponent workspace={workspace}/> : null}
        </div>
    )

}

export default WorkspaceView