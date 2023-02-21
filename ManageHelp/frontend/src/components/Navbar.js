import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()
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
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                    <div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                </nav>
           </div> 
        </header>
    )
}

export default Navbar