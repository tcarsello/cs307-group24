import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
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
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                    {user && ( // only show logout if logged in
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                </nav>
           </div> 
        </header>
    )
}

export default Navbar