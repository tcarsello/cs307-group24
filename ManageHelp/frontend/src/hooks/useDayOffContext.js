import { DayOffContext } from "../context/DayOffContext"
import { useContext } from "react"

export const useDayOffContext = () => {
  const context = useContext(DayOffContext)

  if(!context) {
    throw Error('useDayoffContext must be used inside an DayoffContextProvider')
  }

  return context
}