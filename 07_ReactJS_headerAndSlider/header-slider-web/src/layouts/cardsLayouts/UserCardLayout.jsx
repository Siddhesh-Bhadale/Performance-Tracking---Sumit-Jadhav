import React, { useEffect, useState } from 'react'
import UserCard from '../../components/cards/userCard/UserCard'
import { userData } from '../../utils/StaticData'
import '../../scss/layouts/cardsLayouts/usercardlayout.scss'
import CustomToast from '../../components/toast/CustomToast'

const UserCardLayout = () => {
    const [data, setData] = useState(userData)

    const handleUpdateUser = (id, updatedUser, isDelete = false) => {
        setData((prev) =>
            isDelete ? prev.filter((user) => user.id !== id) : prev.map((user) => user.id !== id ? user : updatedUser))
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

