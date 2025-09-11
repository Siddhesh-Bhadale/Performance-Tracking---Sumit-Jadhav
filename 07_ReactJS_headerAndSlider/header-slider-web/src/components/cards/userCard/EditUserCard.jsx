import React, { useEffect, useState } from 'react'
import '../../../scss/components/editusercard.scss'


const EditUserCard = (props) => {
    const { onBack, userData, isChildVisible, onFormSubmit, onSubmit, activeId } = props
    const [formData, setFormData] = useState({
        id: userData.id,
        firstname: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        email: userData.email,
        ip_address: userData.ip_address
    })

    const handleChange = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    // const handleSubmit = () => {

    //     updatedUserData && updatedUserData(formData)

    // }
    const handleBack = (e) => {
        e.preventDefault();
        onBack(false);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData)
        onSubmit(false)
    }
    useEffect(() => {
        activeId && activeId(formData.id)
        isChildVisible && isChildVisible(true)
    }, [])

    return (
        <form onSubmit={handleFormSubmit} data-component='edituser-card-component'>

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
                    value={formData.lastName} />
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
                <button className="user-card-edit-btn" onClick={handleBack} >
                    Back
                </button>
                <button className="user-card-edit-btn" onClick={handleFormSubmit}>Submit</button>
            </div>


        </form>
    )
}

export default EditUserCard