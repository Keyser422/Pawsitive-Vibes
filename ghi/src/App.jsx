import Nav from './app/Nav'
import './App.css'
import Home from './app/Home'
import ErrorNotification from './components/ErrorNotification'

function App() {
    return (
        <div>
            <ErrorNotification />
            <Nav />
            <Home />
        </div>
    )
}

export default App
