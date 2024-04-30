// import { Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import { baseUrl } from '../services/authService'
// import '../css/ServiceList.css'


// export default function ServiceList(props) {
//     const [services, setServices] = useState([])
//     const [selectedService, setSelectedService] = useState(null)

//     const fetchData = async () => {
//         try {
//             const url = `${baseUrl}/api/services`
//             const res = await fetch(url)
//             if (res.ok) {
//                 const data = await res.json()
//                 setServices(data)
//             } else {
//                 console.error('Error fetching services:', res.statusText)
//             }
//         } catch (error) {
//             console.error('Error fetching services:', error)
//         }
//     }

//     useEffect(() => {
//         fetchData()
//         if (props.pollService) {
//             const polling = setInterval(fetchData, 1)
//             return () => clearInterval(polling)
//         }
//     })

//     const handleServiceClick = (serviceId) => {
//         setSelectedService(serviceId)
//     }

//     const fetchServiceById = async (serviceId) => {
//         try {
//             const url = `${baseUrl}/api/services/${serviceId}`
//             const res = await fetch(url)
//             if (res.ok) {
//                 const data = await res.json()
//                 setSelectedService(data)
//             } else {
//                 console.error('Error fetching service:', res.statusText)
//             }
//         } catch (error) {
//             console.error('Error fetching service:', error)
//         }
//     }

//     useEffect(() => {
//         if (selectedService) {
//             fetchServiceById(selectedService)
//             if (props.pollService) {
//                 const polling = setInterval(fetchServiceById, 1)
//                 return () => clearInterval(polling)
//             }
//         }
//     })

//     const handleBackToList = () => {
//         setSelectedService(null)
//     }
    

//     return (
//         <div className="px-4 py-5 my-5 text-center">
//             {selectedService ? (
//                 <div>
//                     <h1 className="display-5 fw-bold">
//                         {selectedService.service}
//                     </h1>
//                     <div className="col-lg-6 mx-auto">
//                         <img
//                             src={selectedService.picture_url}
//                             className="img-fluid img-thumbnail"
//                             alt="Service"
//                         />
//                     </div>
//                     <div>
//                         <p>Duration: {selectedService.duration}</p>
//                         <p>Cost: {selectedService.cost}</p>
//                         <p>Description: {selectedService.description}</p>

//                         <Link to="create-appt">
//                             <button className="btn btn-primary">
//                                 Book Now
//                             </button>
//                         </Link>
//                         <button
//                             className="btn btn-primary"
//                             onClick={handleBackToList}
//                         >
//                             Back to List
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <div>
//                     <h1 className="display-5 fw-bold">Services</h1>
//                     <table className="table table-striped table-hover">
//                         <thead>
//                             <tr>
//                                 <th>Service</th>
//                                 <th>Image</th>
//                                 <th>Cost</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {services.map((service, index) => (
//                                 <tr
//                                     key={index}
//                                     onClick={() =>
//                                         handleServiceClick(service.id)
//                                     }
//                                 >
//                                     <td>{service.service}</td>
//                                     <td className="w-25">
//                                         <img
//                                             src={service.picture_url}
//                                             className="img-fluid img-thumbnail"
//                                             alt="Service"
//                                         />
//                                     </td>
//                                     <td>{service.cost}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     )
// }



import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from '../services/authService'
import '../css/ServiceList.css'

export default function ServiceList(props) {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState(null)
    const [updatedServiceData, setUpdatedServiceData] = useState({
        service: '',
        picture_url: '',
        description: '',
        duration: '',
        cost: '',
    })

    const fetchData = async () => {
        try {
            const url = `${baseUrl}/api/services`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                setServices(data)
            } else {
                console.error('Error fetching services:', res.statusText)
            }
        } catch (error) {
            console.error('Error fetching services:', error)
        }
    }

    useEffect(() => {
        fetchData()
        if (props.pollService) {
            const polling = setInterval(fetchData, 1000)
            return () => clearInterval(polling)
        }
    }, [props.pollService])

    const handleServiceClick = (serviceId) => {
        setSelectedService(serviceId)
        setUpdatedServiceData(
            services.find((service) => service.id === serviceId)
        )
    }

    const handleUpdateInputChange = (e) => {
        setUpdatedServiceData({
            ...updatedServiceData,
            [e.target.name]: e.target.value,
        })
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${baseUrl}/api/services/${selectedService}`
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedServiceData),
            })
            if (res.ok) {
                fetchData()
                setSelectedService(null)
                setUpdatedServiceData({
                    service: '',
                    picture_url: '',
                    description: '',
                    duration: '',
                    cost: '',
                })
            } else {
                console.error('Error updating service:', res.statusText)
            }
        } catch (error) {
            console.error('Error updating service:', error)
        }
    }

    const handleBackToList = () => {
        setSelectedService(null)
    }

    return (
        <div className="px-4 py-5 my-5 text-center">
            {selectedService ? (
                <div>
                    <h1 className="display-5 fw-bold">
                        {selectedService.service}
                    </h1>
                    <div className="col-lg-6 mx-auto">
                        <img
                            src={selectedService.picture_url}
                            className="img-fluid img-thumbnail"
                            alt="Service"
                        />
                    </div>
                    <div>
                        <p>Duration: {selectedService.duration}</p>
                        <p>Cost: {selectedService.cost}</p>
                        <p>Description: {selectedService.description}</p>
                        <button
                            className="btn btn-primary"
                            onClick={handleBackToList}
                        >
                            Back to List
                        </button>
                    </div>
                    <div>
                        <h2>Update Service</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div>
                                <label htmlFor="service">Service Name:</label>
                                <input
                                    type="text"
                                    name="service"
                                    value={updatedServiceData.service}
                                    onChange={handleUpdateInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="picture_url">Image URL:</label>
                                <input
                                    type="text"
                                    name="picture_url"
                                    value={updatedServiceData.picture_url}
                                    onChange={handleUpdateInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="duration">Duration:</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={updatedServiceData.duration}
                                    onChange={handleUpdateInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="cost">Cost:</label>
                                <input
                                    type="text"
                                    name="cost"
                                    value={updatedServiceData.cost}
                                    onChange={handleUpdateInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    value={updatedServiceData.description}
                                    onChange={handleUpdateInputChange}
                                />
                            </div>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="display-5 fw-bold">Services</h1>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Image</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr
                                    key={service.service}
                                    onClick={() =>
                                        handleServiceClick(service.id)
                                    }
                                >
                                    <td>{service.service}</td>
                                    <td className="w-25">
                                        <img
                                            src={service.picture_url}
                                            className="img-fluid img-thumbnail"
                                            alt="Service"
                                        />
                                    </td>
                                    <td>{service.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}