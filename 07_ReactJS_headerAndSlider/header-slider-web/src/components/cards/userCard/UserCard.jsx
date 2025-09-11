

import React, { useState, useRef, useEffect, useId } from 'react'
import '../../../scss/components/usercard.scss'
import EditUserCard from './EditUserCard';


const UserCard = (props) => {
    const { id, firstName, lastName, email, gender, ip_address, onChange, onEditClick, isUpdate } = props
    // const [isUpdate, setIsUpdate] = useState(false);
    // const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const [cardActiveId, setCardActiveId] = useState(null);
    const buttonId = useId();

    const getData = (data) => {
        onChange && onChange(data)
    }
    const getActiveState = (data) => {
        return data
    }

    // useEffect(() => {
    //     if (isUpdate) {
    //         console.log(`Current Component Id: - ${id} mounted Component ID:- ${cardActiveId}`)

    //         if (id === cardActiveId) {
    //             setIsBtnDisabled(true)
    //             console.log(isBtnDisabled)
    //         }
    //     } else { setIsBtnDisabled(false) }
    // }, [isUpdate, cardActiveId, isBtnDisabled])

    const UserDetails = ({ label, value1, value2 }) => (
        <label className="user-card-label">
            <strong>{`${label}:-`}</strong> {` ${value1} ${value2}`}
        </label>
    );

    return (
        <div data-component="user-card-component">
            {isUpdate ? (
                <EditUserCard
                    userData={props}
                    onBack={() => { !isUpdate }}
                    onFormSubmit={getData}
                    onSubmit={() => { !isUpdate }}
                    activeId={setCardActiveId}
                    isChildVisible={getActiveState}
                // updatedUserData={setUpdatedData}
                />
            ) : (
                <>
                    <div className="user-card-edit-contianer">
                        <button className={`user-card-edit-btn ${getActiveState() ? 'inactive' : 'active'}`} disabled={isUpdate} onClick={onEditClick}>
                            Edit
                        </button>
                    </div>
                    <UserDetails label="FullName" value1={firstName} value2={lastName} />
                    <UserDetails label="Email" value1={email} />
                    <UserDetails label="Gender" value1={gender} />
                    <UserDetails label="IP" value1={ip_address} />
                </>
            )}
        </div>
    );
};


export default UserCard;

