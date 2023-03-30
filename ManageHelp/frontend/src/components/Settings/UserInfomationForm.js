import { useState } from "react"
import { useWorkspaceContext } from "../../hooks/useWorkspaceContext"

const UserInformationForm = () => {
    const { dispatch } = useWorkspaceContext()
    const [companyName, setCompanyName] = useState('')
    const [joinCode, setJoinCode] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workspace = {companyName, joinCode}

        //submit workspace to be added to database with post request
        //need joincode to be updated before this
        const response = await fetch('/api/workspaces', {
            method: 'POST',
            body: JSON.stringify(workspace),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //reset fields to blank if submission worked
            setEmptyFields([])
            setError(null)
            setCompanyName('')
            setJoinCode('')
            //console.log('new workspace created', json)
            dispatch({type: 'CREATE_WORKSPACE', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Enter Your Information</h3>
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                className={emptyFields.includes('companyName') ? 'error' : ''}
            />

            <label>Last Name</label>
            <input 
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                className={emptyFields.includes('companyName') ? 'error' : ''}
            />
            <label>Age(Years)</label>
            <input 
                type="Number" 
                onChange={(e) => setJoinCode(e.target.value)} 
                value={joinCode}
                className={emptyFields.includes('joinCode') ? 'error' : ''}
            />
            <label>Company Name</label>
            <input 
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                className={emptyFields.includes('companyName') ? 'error' : ''}
            />
            <button>Submit</button>
            {error && <div className="error">{'63: ' + error}</div>}
        </form>
    )
    
}
export default UserInformationForm