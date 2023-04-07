import { createContext, useReducer } from 'react'

export const WorkspaceContext = createContext()

export const workspaceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKSPACES':
      return { 
        workspaces: action.payload,
        announcements: state.announcements
      }
    case 'CREATE_WORKSPACE':
      return { 
        workspaces: [action.payload, ...state.workspaces],
        announcements: state.announcements
      }
    case 'DELETE_WORKSPACE':
        return {
          workspaces: state.workspaces.filter((w) => w._id !== action.payload._id),
          announcements: state.announcements
        }
    case 'SET_ANNOUNCEMENTS':
        return {
          workspaces: state.workspaces,
          announcements: action.payload
        }
    case 'CREATE_ANNOUNCEMENT':
        return {
          workspaces: state.workspaces,
          announcements: [action.payload, ...state.announcements]
        }
    default:
      return state
  }
}

export const WorkspaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workspaceReducer, { 
    workspaces: null,
    announcements: null
  })
  
  return (
    <WorkspaceContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkspaceContext.Provider>
  )
}