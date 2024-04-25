import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { baseUrl } from '../services/authService';
import useAuthService from '../hooks/useAuthService';

function ServiceForm() {
    const { user, error, setError } = useAuthService()

    const [service, setService] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [duration, setDuration] = useState('')
    const [cost, setCost] = useState('')

    if (user) {
        return <Navigate to="/" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            service: service,
            picture_url: pictureUrl,
            duration: duration,
            cost: cost
        }

        const url = 'http://localhost:8000/api/services/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const response = await fetch(url, fetchConfig)
            if (!response.ok) {
                throw new Error('Failed to create service')
            }
            const newService = await response.json()
            setService('')
            setPictureUrl('')
            setDuration('')
            setCost('')
        } catch (error) {
            setError(error)
        }
    }

    const handleServiceChange = (e) => {
        const value = e.target.value
        setService(value)
    }

    const handlePictureUrlChange = (e) => {
        const value = e.target.value
        setPictureUrl(value)
    }

    const handleDurationChange = (e) => {
        const value = e.target.value
        setDuration(value)
    }

    const handleCostChange = (e) => {
        const value = e.target.value
        setCost(value)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Service</h1>
                    <form onSubmit={handleSubmit} id="create-service-form">
                        {error && <div className="error">{error.message}</div>}
                        <div className="form-floating mb-3">
                            <input
                                value={service}
                                onChange={handleServiceChange}
                                placeholder="Service Name"
                                required
                                type="text"
                                name="service"
                                id="service"
                                className="form-control"
                            ></input>
                            <label htmlFor="service">Service</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={pictureUrl}
                                onChange={handlePictureUrlChange}
                                placeholder="picture URL"
                                required
                                type="text"
                                name="picture_url"
                                id="picture_url"
                                className="form-control"
                            ></input>
                            <label htmlFor="picture_url">Image URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={duration}
                                onChange={handleDurationChange}
                                placeholder="duration"
                                required
                                type="text"
                                name="duration"
                                id="duration"
                                className="form-control"
                            ></input>
                            <label htmlFor="duration">Duration</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={cost}
                                onChange={handleCostChange}
                                placeholder="cost"
                                required
                                type="text"
                                name="cost"
                                id="cost"
                                className="form-control"
                            ></input>
                            <label htmlFor="cost">Cost</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ServiceForm;