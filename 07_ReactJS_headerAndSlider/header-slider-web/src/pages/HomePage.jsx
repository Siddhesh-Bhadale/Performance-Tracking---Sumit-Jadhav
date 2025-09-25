import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import AnimeListLayout from '../layouts/animeList/AnimeListLayout';
import Rating from '../components/rating/Rating';



const HomePage = () => {
    const [searchValue, setSearchValue] = useState('')
    // 

    return (
        <div data-component='homepage' id='parent'>
            <HeaderComponent
                search={setSearchValue}
            />
            <section className='homepage-slider-container'>
                <SliderComponent />
            </section>
            {/* <Rating rating={4.5} /> */}
            <section>
                <AnimeListLayout searchValue={searchValue} />
            </section>
        </div>
    )
}

export default HomePage


// const [animeCategories, setAnimeCategories] = useState("show1");
// // const [streamCategory, setStreamCategory] = useState({ id: 1, value: "favourite" });
// // const arr = ["Tv", "show", "Genoure", "series", "Tv1", "show1", "Genoure1", "Tv2", "show2", "Genoure2"];
// // const arr2 = [{ id: 1, value: "favourite" }, { id: 2, value: "airing" }, { id: 3, value: "abc" }, { id: 4, value: "bypopularity" }]


// //Static data pagination implememtnation
// // const [page, setPage] = useState(1)
// // const totalCard = 10;
// // const totalLength = Math.floor(animalData.length / totalCard);
// // const end = page * totalCard
// // const start = end - totalCard


// //dummy Card
// const Card = ({ title }) => {
//     return (
//         <div style={{ height: '200px', width: '200px', background: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`, color: 'white', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', textAlign: 'justify' }}>
//             <label>{title}</label>
//         </div>
//     )
// }
{/* <section className='homepage-card-container'>
                <UserCardLayout />
            </section> */}
{/* <section>
                <AnimalCardLayout />
            </section> */}
{/* <h2>Dynamic Data</h2><br></br>
                <PaginationLayout /> */}
{/* <h2>Static Data</h2><br></br>
            <section style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', placeContent: 'center', gap: '1rem' }}>
                    {animalData.slice(start, end)?.map((item, index) => (<Card key={index} title={item?.name} />))}
                </div>
                <Pagination totalElement={totalLength} currentPage={setPage} currentSelected={page} />
            </section> */}