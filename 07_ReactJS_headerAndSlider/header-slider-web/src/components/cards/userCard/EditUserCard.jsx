import React, { useState } from 'react'
import '../../../scss/components/editusercard.scss'


const EditUserCard = (props) => {
    const { onClose, onSubmit } = props
    const [formData, setFormData] = useState({
        id: props?.id || null,
        first_name: props?.first_name || null,
        last_name: props?.last_name || null,
        gender: props?.gender || null,
        email: props?.email || null,
        ip_address: props?.ip_address || null
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
                    value={formData.first_name}
                    onChange={(e) => handleChange(e)}
                    name='first_name'
                />
            </div>
            <div className='edituser-card-items'>
                <label className="user-card-label">LastName:- </label>
                <input className='edituser-inputContainer'
                    name='last_name'
                    onChange={(e) => handleChange(e)}
                    value={formData.last_name}
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
                <button className="edit-user-card-btn close-btn" onClick={() => onClose(formData)} >
                    Close
                </button>
                <button className="edit-user-card-btn submit-btn" onClick={() => onSubmit(formData)}>Submit</button>
            </div>
        </div>
    )
}

export default EditUserCard

