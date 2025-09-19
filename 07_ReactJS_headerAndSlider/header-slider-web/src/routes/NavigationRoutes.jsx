import React from 'react'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AnimeDetailsPage from '../pages/animeDetails/AnimeDetailsPage';
const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/anime-details/:id', element: <AnimeDetailsPage /> },
    {
        path: '*', element: <div>
            <h1>404 Page Not Found</h1>
            <Link to='/' >go back to the home</Link>
        </div>
    }

])

const NavigationRoutes = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default NavigationRoutes