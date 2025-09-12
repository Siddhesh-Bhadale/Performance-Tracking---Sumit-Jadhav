

import { useState } from 'react';
import '../../../scss/components/usercard.scss'
import EditUserCard from './EditUserCard';

const UserCard = (props) => {
    const { id, firstName, lastName, email, gender, ip_address, disabled, onClick, updatedUserData } = props
    const [isOpen, setIsOpen] = useState(false)

    const UserDetails = ({ label, value1, value2 = "" }) => (
        <label className="user-card-label">
            <strong>{`${label}:-`}</strong> {` ${value1} ${value2}`}
        </label>
    );

    const handleButtonClick = () => {
        const active = document.getElementById(id)
        if (active.id == id) {
            onClick && onClick(id)
            setIsOpen(true)
        }
    }
    return (
        <>
            {isOpen === true ? (<>
                <EditUserCard
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    gender={gender}
                    ip_address={ip_address}
                    onClose={() => {
                        onClick && onClick(null)
                        return setIsOpen(false)
                    }}
                    onSubmit={(e) => {
                        updatedUserData && updatedUserData(e)
                        onClick && onClick(null)
                        return setIsOpen(false);
                    }}
                />
            </>) : (<>
                <div data-component="user-card-component">
                    <div className="user-card-edit-contianer">
                        <button id={id} className={`user-card-edit-btn ${disabled ? 'inactive' : 'active'}`} disabled={disabled} onClick={handleButtonClick}>
                            Edit
                        </button>
                    </div>
                    <div className='user-card-data-contianer'>
                        <UserDetails label="FullName" value1={firstName} value2={lastName} />
                        <UserDetails label="Email" value1={email} />
                        <UserDetails label="Gender" value1={gender} />
                        <UserDetails label="IP" value1={ip_address} />
                    </div>

                </div >
            </>)}

        </>

    );
};


export default UserCard;