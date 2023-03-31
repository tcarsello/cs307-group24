import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"
import CreateScheduleForm from '../components/Manager/CreateScheduleForm'
import AddShiftForm from '../components/Manager/AddShiftForm'
import PublishScheduleForm from '../components/Manager/PublishScheduleForm'

const EditSchedules = () => {

    const { id } = useParams()
    const { user } = useAuthContext()

    return (
        <div id='edit-schedules-container'>
            <h1>Edit Schedules</h1>

            <Collapsible trigger={[<BsChevronDown />, " View Current / Future Schedules"]}>
                <h3>Current / Future Schedules</h3>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Create New Schedule"]}>
                <CreateScheduleForm workspace_id={id}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Publish / Un-Publish Schedule"]}>
                <PublishScheduleForm workspace_id={id}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Add Shift to Schedule"]}>
                <AddShiftForm workspace_id={id}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " View Past Schedules"]}>
                <h3>Past Schedules</h3>
            </Collapsible>

        </div>
    )

}

export default EditSchedules