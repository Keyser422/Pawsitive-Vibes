import { useState, useEffect } from 'react';
import { baseUrl } from '../services/authService';
import '../css/Testimonials.css'


function TestimonialsList(props) {
    const [ testimonials, SetTestimonials ] = useState([]);
    const [ error, setError ] = useState(null);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/testimonials`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                SetTestimonials(data);
            } else {
                throw new Error('Failed to fetch testimonials');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
         fetchTestimonials();
    }, []);

    const handleApprove = async (id) => {


        try {
            const response = await fetch(`${baseUrl}/api/testimonials/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }),
            })

            if (response.ok) {
                SetTestimonials(
                    testimonials.map((t) =>
                        t.id === id ? { ...t, approved: true } : t
                    )
                )
            } else {
                throw new Error('Failed to approve testimonial')
            }
        } catch (error) {
            setError('Failed to approve testimonial: ' + error.message)
        }
    }

    return (
        <div className="testimonials-container">
            <h1>Testimonials</h1>
            {error && <p className="error">{error}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rating</th>
                        <th>Username</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial) => (
                        <tr key={testimonial.id}>
                            <td>{testimonial.id}</td>
                            <td>{testimonial.rating}</td>
                            <td>{testimonial.name}</td>
                            <td>{testimonial.description}</td>
                            <td>
                                {!testimonial.approved && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleApprove(testimonial.id)}
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TestimonialsList;
