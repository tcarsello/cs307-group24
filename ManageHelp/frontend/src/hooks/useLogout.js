import { useAuthContext } from './useAuthContext' 
//don't need to send request to backend to logout, just need to change state and update local storage
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    
    const logout = () => {
        //update local storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}