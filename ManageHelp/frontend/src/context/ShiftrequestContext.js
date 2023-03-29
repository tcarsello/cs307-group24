import { createContext, useReducer } from 'react'

export const ShiftrequestContext = createContext()

export const shiftrequestReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHIFTREQUESTS':
      return { 
        shiftrequests: action.payload 
      }
    case 'SET_OTHERSHIFTREQUESTS':
      return { 
        othershiftrequests: action.payload 
      }  
    default:
      return state
  }
}

export const ShiftrequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shiftrequestReducer, { 
    shiftrequests: null
  })
  
  return (
    <ShiftrequestContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ShiftrequestContext.Provider>
  )
}