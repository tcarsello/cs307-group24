import { useAuthContext } from './useAuthContext' 
import { useWorkspaceContext } from './useWorkspaceContext'
//don't need to send request to backend to logout, just need to change state and update local storage
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workspaceDispatch } = useWorkspaceContext()
    
    const logout = () => {
        //update local storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        workspaceDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}