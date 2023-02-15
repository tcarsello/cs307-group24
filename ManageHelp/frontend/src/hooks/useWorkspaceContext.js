import { WorkspaceContext } from "../context/WorkspaceContext"
import { useContext } from "react"

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext)

  if(!context) {
    throw Error('useWorkspaceContext must be used inside an WorkspaceContextProvider')
  }

  return context
}