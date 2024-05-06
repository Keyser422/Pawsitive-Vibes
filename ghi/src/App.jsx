import Nav from './app/Nav'
import SideNav from './app/SideNav'
import './css/App.css'
import './css/index.css'
import Home from './app/Home'
import ErrorNotification from './components/ErrorNotification'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { baseUrl } from './services/authService'
import Community from './app/Community'
import SignInForm from './app/SignInForm'
import SignUpForm from './app/SignUpForm'
import SignOut from './components/SignOut'
import Services from './app/Services'
import Testimonials from './app/Testimonials'
import Dogs from './app/Dogs'
import UpdatePet from './components/UpdatePet'
import useAuthService from './hooks/useAuthService'
import Footer from './app/Footer'
import UpdateService from './components/UpdateService'
import ServiceList from './components/ServiceList'
import TestimonialsList from './components/GetAllTestimonials'
import Profile from './components/Profile'
import CreateAppt from './components/CreateAppt'

function App() {
    const { user, isLoggedIn } = useAuthService()
    const [admin, setAdmin] = useState(false)
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoggedIn) {
                return // Don't fetch user data if user is not logged in
            }

            const user_id = user.id
            const userUrl = `${baseUrl}/api/users/${user_id}`
            try {
                const response = await fetch(userUrl, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    const userData = await response.json()
                    setAdmin(userData.admin)
                    console.log('Is Admin:', userData.admin)
                }
            } catch (e) {
                console.error(e)
            }
        }

        if (isLoggedIn) {
            fetchUser()
        }
    }, [isLoggedIn, user, setAdmin])

    const handleSignOut = () => {
        setRefresh(!refresh)
        setAdmin(false)
    }

    return (
        <BrowserRouter>
            <div>
                <ErrorNotification />
                <Nav />
                <SideNav />
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/create-appt" element={<CreateAppt />} />

                    <Route
                        path="/pets"
                        element={<Dogs key={refresh} admin={admin} />}
                    />
                    <Route
                        path="pets/:petId"
                        element={<UpdatePet key={refresh} admin={admin} />}
                    />
                    <Route
                        path="/services"
                        element={<Services key={refresh} admin={admin} />}
                    />
                    <Route
                        path="/testimonials"
                        element={<Testimonials key={refresh} admin={admin} />}
                    />
                    <Route
                        path="/updateservice/:serviceId"
                        element={<UpdateService key={refresh} admin={admin} />}
                    />
                    <Route path="/dogs" element={<Dogs />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/servicelist" element={<ServiceList />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/testimonials/manage" element={<TestimonialsList />} />
                    {!isLoggedIn ? (
                        <>
                            <Route path="/signup" element={<SignUpForm />} />
                            <Route path="/signin" element={<SignInForm />} />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/signup"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/signin"
                                element={<Navigate to="/" />}
                            />
                        </>
                    )}
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/community"
                                element={<Community admin={admin} />}
                            />
                            <Route
                                path="/profile"
                                element={<Profile admin={admin} />}
                            />
                            <Route
                                path="/signout"
                                element={<SignOut signout={handleSignOut} />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/community"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/profile"
                                element={<Navigate to="/" />}
                            />
                            <Route
                                path="/signout"
                                element={<Navigate to="/" />}
                            />
                        </>
                    )}
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
