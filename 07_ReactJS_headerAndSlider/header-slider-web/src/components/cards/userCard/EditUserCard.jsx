import React, { useEffect, useState } from 'react'
import '../../../scss/components/editusercard.scss'


const EditUserCard = (props) => {
    const { id, firstName, lastName, gender, email, ip_address, onClose, onSubmit } = props
    const [formData, setFormData] = useState({
        id: id || null,
        firstname: firstName || null,
        lastName: lastName || null,
        gender: gender || null,
        email: email || null,
        ip_address: ip_address || null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div data-component='edituser-card-component'>
            <div className='edituser-card-items'>
                <label className="user-card-label">FirstName:- </label>
                <input className='edituser-inputContainer'
                    value={formData.firstname}

                    onChange={(e) => handleChange(e)}
                    name='firstname'
                />
            </div>
            <div className='edituser-card-items'>
                <label className="user-card-label">LastName:- </label>
                <input className='edituser-inputContainer'
                    name='lastName'
                    onChange={(e) => handleChange(e)}
                    value={formData.lastName}
                />
            </div>
            <div className='edituser-card-items'>
                <label className="user-card-label">Email:- </label>
                <input className='edituser-inputContainer'
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    name='email'
                />
            </div>
            <div className='edituser-card-items'>
                <label className="user-card-label">Gender:- </label>
                <input className='edituser-inputContainer'
                    value={formData.gender}
                    onChange={(e) => handleChange(e)}
                    name='gender'
                />
            </div>
            <div className='edituser-card-items'>
                <label className="user-card-label">IP Address:- </label>
                <input className='edituser-inputContainer'
                    value={formData.ip_address}
                    onChange={(e) => handleChange(e)}
                    name='ip_address'
                />
            </div>
            <div className="user-card-edit-contianer">
                <button className="user-card-edit-btn close-btn" onClick={() => onClose(formData)} >
                    Close
                </button>
                <button className="user-card-edit-btn submit-btn" onClick={() => onSubmit(formData)}>Submit</button>
            </div>
        </div>
    )
}

export default EditUserCard

