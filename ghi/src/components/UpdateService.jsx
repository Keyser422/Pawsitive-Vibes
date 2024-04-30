import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../services/authService'

export default function UpdateService({ serviceId }) {
    const [service, setService] = useState({
        service: '',
        description: '',
        picture_url: '',
        duration: 0,
        cost: '',
    })

    useEffect(() => {
        const fetchService = async () => {
            try {
                const url = `${baseUrl}/api/services/${serviceId}`
                const res = await fetch(url)
                if (res.ok) {
                    const data = await res.json()
                    setService(data)
                } else {
                    console.error('Error fetching service:', res.statusText)
                }
            } catch (error) {
                console.error('Error fetching service:', error)
            }
        }
        fetchService()
    }, [serviceId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setService({ ...service, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${baseUrl}/api/services/${serviceId}`
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            })
            if (res.ok) {
                console.log('Service updated successfully')
                // Handle success, e.g., redirect or show message
            } else {
                console.error('Error updating service:', res.statusText)
            }
        } catch (error) {
            console.error('Error updating service:', error)
        }
    }

    return (
        <div className="container">
            <h1>Edit Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">
                        Service Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="service"
                        name="service"
                        value={service.service}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={service.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="picture_url" className="form-label">
                        Picture URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="picture_url"
                        name="picture_url"
                        value={service.picture_url}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">
                        Duration
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={service.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cost" className="form-label">
                        Cost
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cost"
                        name="cost"
                        value={service.cost}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/">Cancel</Link>
            </form>
        </div>
    )
}
