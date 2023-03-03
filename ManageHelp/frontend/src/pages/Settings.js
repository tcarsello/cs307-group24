import { useState } from "react"
import { useSignup } from '../hooks/useSignup'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AvailabilityRestrictionsComponent from '../components/AvailabilityRestrictionsComponent'

//import UserInformationForm from "../components/UserInfomationForm"

const Settings = () => {
  //Defining state variables to hold the updated usernames and passwords
  const { user } = useAuthContext()
  const [inputPasswordValue, setInputPasswordValue] = useState("")
  const [newName, setNewName] = useState("")
  const [nameError, setNameError] = useState(null)
  const [sentName, setSentName ] = useState(null)
  const {changePass, isLoading, error, isSending} = useSignup()
  //Defining functions to handle changes in the input and changes in the button
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (!user) {
      console.log('You must be logged in')
      return
    }
    console.log("Handled id: " + user.email)
    await changePass(user.email, inputPasswordValue)
    setInputPasswordValue("")
  };

  const handleNameChange = async (e) => {
    e.preventDefault()
        
    const bodyContent = {
        name: newName,
    }
    console.log('Email being sent: ' + user.email)
    const response = await fetch('/api/user/' + user.email, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    if (!response.ok) {
        setNameError(json.error)
    }
    if (response.ok) {
        setSentName('Name Updated, will be reflected in navbar next login.')
        setNameError(null)
        setNewName('')
    }
  };

  return (

    <div>
      <div>
        <h1>Settings</h1>
        <h2>Change Password:</h2>
        <h3>Enter new Password:</h3>
            <form>
                <input 
                type="password"
                onChange={(e) => setInputPasswordValue(e.target.value)}
                value={inputPasswordValue}
                disabled={isLoading}
                />
                <button onClick={handlePasswordChange}>Update</button>
                {error && <div className='error'>{error}</div>}
                {isSending && <div>{isSending}</div>}
            </form>
        <br/>
        <h2>Name:</h2>
        <h3>Enter new Name:</h3>
            <form>
                <input 
                type="text"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                disabled={isLoading}
                />
                <button onClick={handleNameChange}>Update</button>
                {nameError && <div className='error'>{nameError}</div>}
                {sentName && <div>{sentName}</div>}
            </form>
                
            
      </div>
      <AvailabilityRestrictionsComponent user_email={user.email}/>
    </div>
  )
}

export default Settings
