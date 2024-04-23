import { NavLink } from 'react-router-dom'

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Pawsitive Vibes
                </NavLink>
            </div>
        </nav>
    )
}

export default Nav
