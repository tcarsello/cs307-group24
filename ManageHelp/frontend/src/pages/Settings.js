import { useEffect } from "react"
import { useWorkspaceContext } from "../hooks/useWorkspaceContext"
import { useRef } from "react"
import { useState } from "react"

// components

import UserInformationForm from "../components/UserInfomationForm"

const Settings = () => {
  const { workspaces, dispatch } = useWorkspaceContext()
  //Defining state variables to hold the updated usernames and passwords
  const [inputUsernameValue, setInputUsernameValue] = useState(""); 
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  //Defining functions to handle changes in the input and changes in the button
  const handleUsernameChange = (event) => {
    setInputUsernameValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setInputPasswordValue(event.target.value);
  };
  const handleUsernameAlert = () => {
    alert(inputUsernameValue);
  };
  const handlePasswordAlert = () => {
    alert(inputPasswordValue);
  };

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const response = await fetch('/api/workspaces')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKSPACES', payload: json})
      }
    }

    fetchWorkspaces()
  }, [dispatch])

  return (

    <div className="home">
      <div className="workspaces">
      <h1>Settings</h1>
      <h2>Change Username and Password</h2>
            <h3>Enter new username</h3>
                <form>
                <fieldset>
                    <input value={inputUsernameValue} type="text" onChange={handleUsernameChange}/>
                </fieldset>
                <button onClick={handleUsernameAlert}>Update</button>
                </form>
            <h3>Enter new Password</h3>
                <form>
                <fieldset>
                    <input value={inputPasswordValue} type="text" onChange={handlePasswordChange}/>
                </fieldset>
                <button onClick={handlePasswordAlert}>Update</button>
                </form>
                
            
      </div>
      <UserInformationForm />
    </div>
  )
}

export default Settings
