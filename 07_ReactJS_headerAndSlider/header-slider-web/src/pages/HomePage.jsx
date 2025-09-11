import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import DropDownComponent from '../components/drop-down/DropDownComponent';
import UserCard from '../components/cards/userCard/UserCard';
import { userData } from '../utils/StaticData';


const HomePage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [animeCategories, setAnimeCategories] = useState("show1");
    const [streamCategory, setStreamCategory] = useState({ id: 1, value: "favourite" });
    const [newUpdateduser, setNewUpdatedUser] = useState()
    const updateObject = userData.map((item, index) => item?.id !== newUpdateduser?.id ? item : newUpdateduser);
    const [isUpdate, setIsUpdate] = useState(false)


    const arr = ["Tv", "show", "Genoure", "series", "Tv1", "show1", "Genoure1", "Tv2", "show2", "Genoure2"];
    const arr2 = [{ id: 1, value: "favourite" }, { id: 2, value: "airing" }, { id: 3, value: "abc" }, { id: 4, value: "bypopularity" }]

    const handleClick = () => {
        setIsUpdate(true)
    }
    return (
        <div data-component='homepage' id='parent'>
            <HeaderComponent
                search={setSearchValue}
            />
            <div className='homepage-slider-container'>
                <SliderComponent />
            </div>
            <section className='drop-down-contianer'>

                <DropDownComponent
                    placeholder='Type'
                    options={arr}
                    deafaultValue={animeCategories}
                    result={setAnimeCategories}
                />

                <DropDownComponent
                    placeholder='Type'
                    options={arr2}
                    deafaultValue={streamCategory}
                    result={setStreamCategory}
                    isMultiSelect={true}
                />
            </section>
            <section className='homepage-card-container'>
                {
                    updateObject.map((item, index) => {
                        return (
                            <div className='user-card-container' key={index}>
                                <UserCard
                                    id={item?.id}
                                    firstName={item?.first_name || item?.firstname}
                                    lastName={item?.last_name || item?.lastName}
                                    email={item?.email}
                                    gender={item?.gender}
                                    ip_address={item?.ip_address}
                                    onChange={setNewUpdatedUser}
                                    onEditClick={handleClick}
                                    isUpdate={isUpdate}
                                />
                            </div>
                        )
                    })
                }

            </section>
            {/* <section style={{ height: "400px " }}>
                <label>{`Selected Drop Down value: - ${JSON.stringify(animeCategories)}`}</label> <br />

                <label>{`Selected second Drop Down value: - ${JSON.stringify(streamCategory)}`}</label> <br />
                <label>{`Selected second Drop Down value: - ${streamCategory.value}`}</label>
            </section> */}

        </div>
    )
}

export default HomePage