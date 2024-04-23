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
        
    }
}