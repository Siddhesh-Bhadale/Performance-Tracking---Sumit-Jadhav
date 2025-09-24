import React, { useEffect, useState } from 'react'
import UserCard from '../../components/cards/userCard/UserCard'
import { userData } from '../../utils/StaticData'
import '../../scss/layouts/cardsLayouts/usercardlayout.scss'
import CustomToast from '../../components/toast/CustomToast'

const UserCardLayout = () => {
    const [data, setData] = useState(userData)
    const handleUpdateUser = (id, updatedUser, isDelete = false) => {
        const notify = (message, isVisible, delay = 3000) => {
            // console.log("notify is running", message)
            return <CustomToast message={message} isVisible={isVisible} delay={delay} />
        }
        setData((prev) =>
            isDelete ? prev.filter((user) => user.id !== id) : prev.map((user) => user.id !== id ? user : updatedUser))
        // notify(isDelete ? "user deleted successfully" : "user updated successfully")
        isDelete ? notify("user deleted successfully", true) : notify("user updated successfully", true)
    };
    return (
        <div data-component='user-cards-layout-container' >
            {data?.map((item, index) => {
                return (
                    <div className='user-card-wrapper' key={index}>
                        <UserCard
                            {...item}
                            updatedUserData={(e) => { handleUpdateUser(item.id, e, false) }}
                            deleteUserData={(e) => { handleUpdateUser(item.id, e, true) }}
                        />
                    </div>
                )
            }

            )}
        </div>
    )
}

export default UserCardLayout

