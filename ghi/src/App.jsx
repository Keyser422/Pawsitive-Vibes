import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './app/Nav'

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Nav />
                <Routes>
                    <div>test</div>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
