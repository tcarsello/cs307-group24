import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    //const {settings} = useSettings()

    const handleLogoutClick = () => {
        logout()
    }

    return (
        <header>
           <div className="container">
                <Link to="/">
                    <h1>ManageHelp</h1>
                </Link>
                <nav>
                    {!user && ( // only show login/signup if not logged in
                        <div>
                            <Link to="/Login">Login</Link>
                            <Link to="/Signup">Signup</Link>
                        </div>
                    )}
                    {user && ( // only show logout and settings if logged in
                        <div>
                            <span>{user.name}</span>

                            <Link to="/Settings">Settings</Link>
                            <button onClick={handleLogoutClick}>Log out</button>

                        </div>
                                                
                    )}
                </nav>
           </div> 
        </header>
    )
}

export default Navbar