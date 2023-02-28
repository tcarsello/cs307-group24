import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

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

const WorkspaceView = () => {

    const {id} = useParams()
    const { user } = useAuthContext()

    const [workspace, setWorkspace] = useState('')
    
    useEffect(() => {
        getWorkspace(id, user).then(w => {
            setWorkspace(w)
        })
    })

    return (
        <h1>{workspace.companyName}</h1>
    )

}

export default WorkspaceView