// @ts-check
import useAuthService from './hooks/useAuthService'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import './App.css'

function App() {
    const { signout, user } = useAuthService()
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '80%',
                    margin: 'auto',
                }}
            >
                <NavLink to="/todos/create">new todo</NavLink>
                <NavLink to="/todos">my list</NavLink>
                {user ? (
                    <button onClick={signout}>sign out</button>
                ) : (
                    <>
                        <NavLink to="/signin">sign in</NavLink>
                        <NavLink to="/signup">sign up</NavLink>
                    </>
                )}
            </div>
            {user && <div>welcome user: {user.username}</div>}
            <Outlet />
        </div>
    )
}

export default App
