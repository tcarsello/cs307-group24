import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default: 
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null // since whenever you initally load the website we expect you to be logged out
    })

    console.log('authcontext state: ', state)

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}