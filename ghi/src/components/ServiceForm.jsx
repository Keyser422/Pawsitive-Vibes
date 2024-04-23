import React, { useSate, useState } from 'react';

function ServiceForm () {
    const [service, setService] = useSate('');
    const [pictureUrl, setPictureUrl] = useSate('');
    const [duration, setDuration] = useState('');
    const [cost, setCost] = useSate('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.service = service;
        data.picture_url = pictureUrl;
        data.duration = duration;
        data.cost = cost;

        const url = "http://localhost:8000/api/services/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newService = await response.json();
            setService('');
            setPictureUrl('');
            setDuration('');
            setCost('');
        }
    }


    const handleServiceChange = (e) => {
        const value = e.target.value;
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
                    </form>
                </div>
            </div>
        </div>
    )
}