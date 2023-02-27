import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, resetPass, error, isLoading, isSending} = useLogin()

    const state = {
        button: 1
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (state.button === 1) {
            await login(email, password)
        }
        if (state.button === 2) {
            //send email functionality
            await resetPass(email)
        }
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button
                onClick={() => (state.button = 1)}
                disabled={isLoading}
            >
              Login
            </button>
            <button
                onClick={() => (state.button = 2)}
                disabled={isLoading}
            >
              Send Reset Password Email
            </button>
            {isSending && <div>{isSending}</div>}
            {error && <div className='error'>{error}</div>}

        </form>
    )
}

export default Login