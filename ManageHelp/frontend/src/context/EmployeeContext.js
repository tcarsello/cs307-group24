import { createContext, useReducer } from 'react'

export const EmployeeContext = createContext()

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      console.log('\nsetting\n')
      return { 
        employees: action.payload 
      }
    default:
      return state
  }
}

export const EmployeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, { 
    employees: null
  })
  
  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      { children }
    </EmployeeContext.Provider>
  )
}