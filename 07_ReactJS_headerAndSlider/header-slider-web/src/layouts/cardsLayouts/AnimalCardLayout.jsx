import React, { useState } from 'react'
import '../../scss/layouts/cardsLayouts/animalcardlayout.scss'
import { animalData } from '../../utils/StaticData'

const AnimalCardLayout = () => {
    const [selectedOption, setSelectedOption] = useState()
    const filterEnteries = animalData.filter((item) => selectedOption ? item.class === selectedOption : item)
    const selectionList = animalData?.reduce((acc, curr) => {
        if (!acc.includes(curr.class)) {
            acc.push(curr.class)
        } return acc
    }, [])

    const CustomButton = ({ title, value = null }) => {
        return (
            <>
                <button id='selectionBtn'
                    className={`card-button ${selectedOption === title ? 'active-card-button' : ""}`}
                    onDoubleClick={() => setSelectedOption()} onClick={() => setSelectedOption(value)}>{title}</button>
            </>
        )
    }
    const Card = ({ title }) => {
        return (
            <div className='card-container'>
                <label>{title}</label>
            </div>

        )
    }

    return (

        <div data-component='animal-card-layout'>
            <div className='animal-card-selections'>
                {selectionList.map((item, index) => (
                    <CustomButton key={index} title={item} value={item} />
                ))}
            </div>
            <div className='animal-show-card-container'>
                {filterEnteries?.map((item, index) => (
                    <Card key={index} title={item?.name} />
                ))

                }
            </div>
        </div>

    )
}

export default AnimalCardLayout