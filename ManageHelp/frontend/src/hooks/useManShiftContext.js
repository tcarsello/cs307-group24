import { ManShiftRequestContext } from "../context/ManShiftRequestContext"
import { useContext } from "react"

export const useManShiftContext = () => {
  const context = useContext(ManShiftRequestContext)

  if(!context) {
    throw Error('useManShiftContext must be used inside an ManShiftRequestContext')
  }

  return context
}