import { createContext, useReducer } from 'react'

export const ManShiftRequestContext = createContext()

export const ManShiftRequestReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MANSHIFTREQUESTS':
      return { 
        manshiftrequests: action.payload 
      }
    default:
      return state
  }
}

export const ManShiftRequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ManShiftRequestReducer, { 
    manshiftrequests: null
  })
  
  return (
    <ManShiftRequestContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ManShiftRequestContext.Provider>
  )
}