import { createContext, useReducer } from 'react'

export const DayOffContext = createContext()

export const dayOffReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DAYOFFS':
      return { 
        dayoffs: action.payload 
      }
    default:
      return state
  }
}

export const DayOffContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dayOffReducer, { 
    dayoffs: null
  })
  
  return (
    <DayOffContext.Provider value={{ ...state, dispatch }}>
      { children }
    </DayOffContext.Provider>
  )
}