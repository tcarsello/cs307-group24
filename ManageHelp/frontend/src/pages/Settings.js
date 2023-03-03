import { useState } from "react"
import { useSignup } from '../hooks/useSignup'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AvailabilityRestrictionsComponent from '../components/AvailabilityRestrictionsComponent'

//import UserInformationForm from "../components/UserInfomationForm"

const Settings = () => {
  //Defining state variables to hold the updated usernames and passwords
  const { user } = useAuthContext()
  const [inputPasswordValue, setInputPasswordValue] = useState("");
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
                
            
      </div>
      <AvailabilityRestrictionsComponent user_email={user.email}/>
    </div>
  )
}

export default Settings
