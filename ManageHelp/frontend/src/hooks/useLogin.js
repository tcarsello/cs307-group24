import { useAuthContext } from "./useAuthContext"
import { useState } from 'react'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type:': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            // save user to local storage so that they aren't logged out if they close browser
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context with authContext hook
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false) //since we are done
        }

    }

    return { login, isLoading, error}
}