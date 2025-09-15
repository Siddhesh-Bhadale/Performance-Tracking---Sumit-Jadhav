

import { useState } from 'react';
import '../../../scss/components/usercard.scss'
import EditUserCard from './EditUserCard';
import ConfirmationModal from '../../modals/ConfirmationModal';

const UserCard = (props) => {
    const { updatedUserData, deleteUserData } = props
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleButtons = (isDisabled, target, selector, color) => {
        const buttons = document.querySelectorAll(selector)
        buttons.forEach((item) => {
            if (item === target) return

            item.disabled = isDisabled;
            if (isDisabled) {
                item.style.backgroundColor = 'gray';
                item.style.cursor = 'not-allowed';
            } else {
                item.style.backgroundColor = color;
                item.style.cursor = 'pointer';
            }
        })
    }

    const handleDelete = (e) => {
        setIsModalOpen(true)
        handleButtons(true, e.target, '.user-card-edit-btn-delete', 'red')
        handleButtons(true, e.target, '.user-card-edit-btn', 'blue')

    }
    const handleCancelDelete = (e) => {
        setIsModalOpen(false)
        handleButtons(false, null, '.user-card-edit-btn-delete', "red")
        handleButtons(false, null, '.user-card-edit-btn', 'blue')

    }
    const handleEditOpen = (e) => {
        setIsOpen(true);
        handleButtons(true, e.target, '.user-card-edit-btn', 'blue')
        handleButtons(true, e.target, '.user-card-edit-btn-delete', "red")
    }
    const handleEditClose = () => {
        setIsOpen(false);
        handleButtons(false, null, '.user-card-edit-btn', 'blue')
        handleButtons(false, null, '.user-card-edit-btn-delete', "red")
    }


    const UserDetails = ({ label, value1 = "", value2 = "" }) => (
        <label className="user-card-label">
            <strong>{`${label}:-`}</strong> {` ${value1} ${value2}`}
        </label>
    );

    return (
        <>
            {isOpen === true ? (<>
                <EditUserCard
                    {...props}
                    onClose={handleEditClose}
                    onSubmit={(e) => {
                        updatedUserData && updatedUserData(e)
                        return handleEditClose();
                    }}
                />
            </>) : (<>
                <div id='user-card-component' data-component="user-card-component">
                    <div className="user-card-edit-contianer">
                        <button id={props.id}
                            className='user-card-edit-btn'
                            onClick={handleEditOpen}
                        >
                            Edit
                        </button>
                        <button id={props.id}
                            className='user-card-edit-btn-delete'
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                    <div className='user-card-data-contianer'>
                        <UserDetails label="FullName" value1={props?.first_name} value2={props?.last_name} />
                        <UserDetails label="Email" value1={props?.email} />
                        <UserDetails label="Gender" value1={props?.gender} />
                        <UserDetails label="IP" value1={props?.ip_address} />
                    </div>

                </div >
            </>)}
            {isModalOpen &&
                <ConfirmationModal
                    description={`Do you really want to delete ${props.first_name} ?...`}
                    postion={'middle'}
                    onSubmit={() => {
                        deleteUserData && deleteUserData(true)
                        return handleCancelDelete()

                    }}
                    onCancel={handleCancelDelete} />
            }
        </>

    );
};


export default UserCard;