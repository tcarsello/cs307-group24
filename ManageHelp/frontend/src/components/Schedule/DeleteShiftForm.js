import {useState} from 'react'

export default function DeleteShiftForm({schedule, render_func}) {

    const [shift, setShift] = useState('')

    const onSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(`/api/shift/${shift}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()

        if (response.ok) {
            render_func(json)
        }

    }

    return(
        <form id='delete-shift-form' onSubmit={onSubmit}>
            <label>Shift ID:</label>
            <input type='text' value={shift} onChange={e => setShift(e.target.value)}/>
            <button className='fancy-button' type='submit'>Delete Shift</button>
        </form>
    )

}