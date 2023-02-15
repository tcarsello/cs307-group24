import { createContext, useReducer } from 'react'

export const WorkspaceContext = createContext()

export const workspaceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKSPACES':
      return { 
        workspaces: action.payload 
      }
    case 'CREATE_WORKSPACE':
      return { 
        workspaces: [action.payload, ...state.workspaces] 
      }
    case 'DELETE_WORKSPACE':
        return {
          workspaces: state.workspaces.filter((w) => w._id !== action.payload._id)
        }
    default:
      return state
  }
}

export const WorkspaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workspaceReducer, { 
    workspaces: null
  })
  
  return (
    <WorkspaceContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkspaceContext.Provider>
  )
}