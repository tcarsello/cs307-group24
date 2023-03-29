import { ShiftrequestContext } from "../context/ShiftrequestContext"
import { useContext } from "react"

export const useShiftrequestContext = () => {
  const context = useContext(ShiftrequestContext)

  if(!context) {
    throw Error('useShiftrequestContext must be used inside an ShiftrequestContextProvider')
  }

  return context
}