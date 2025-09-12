import React, { useEffect, useState } from 'react'
import UserCard from '../../components/cards/userCard/UserCard'
import { userData } from '../../utils/StaticData'
import '../../scss/layouts/cardsLayouts/usercardlayout.scss'

const UserCardLayout = () => {
    const [userId, setUserId] = useState(null);
    // const [newUpdateduser, setNewUpdatedUser] = useState(null)
    const [data, setData] = useState(userData)
    // const updateObject = userData.map((item, index) => item?.id !== newUpdateduser?.id ? item : newUpdateduser);
    const handleUpdateUser = (id, updatedUser) => {
        setData((prev) => prev.map((user) => user.id !== id ? user : updatedUser))
    };


    return (
        <div data-component='user-cards-layout-container' >
            {data?.map((item, index) => {
                return (
                    <div className='user-card-wrapper' key={index}>

                        <UserCard
                            id={item?.id}
                            firstName={item?.first_name || item?.firstname}
                            lastName={item?.last_name || item?.lastName}
                            email={item?.email}
                            gender={item?.gender}
                            ip_address={item?.ip_address}
                            onClick={(e) => setUserId(e)}
                            disabled={userId === null ? false : true}
                            // updatedUserData={setNewUpdatedUser}
                            updatedUserData={(e) => { handleUpdateUser(item.id, e) }}
                        />

                        {/* {userId === item.id ? (<>
                            <EditUserCard
                                id={item?.id}
                                firstName={item?.first_name || item?.firstname}
                                lastName={item?.last_name || item?.lastName}
                                email={item?.email}
                                gender={item?.gender}
                                ip_address={item?.ip_address}
                                onClose={() => setUserId(null)}
                                onSubmit={(e) => {
                                    setNewUpdatedUser(e);
                                    return setUserId(null);
                                }}
                            />
                        </>) : (<>
                            <UserCard
                                id={item?.id}
                                firstName={item?.first_name || item?.firstname}
                                lastName={item?.last_name || item?.lastName}
                                email={item?.email}
                                gender={item?.gender}
                                ip_address={item?.ip_address}
                                onClick={(e) => setUserId(e)}
                                disabled={userId ? true : false}
                            />
                        </>)} */}
                    </div>
                )
            }

            )}
        </div>
    )
}

export default UserCardLayout

