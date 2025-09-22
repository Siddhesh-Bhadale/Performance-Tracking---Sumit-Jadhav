// import React, { useEffect, useState } from 'react'

// const apiThrottleHook = ({ episodeNo, animeId }) => {
//     // const [data, setData] = useState();
//     // let shouldWait = false;

//     // if (shouldWait) {
//     //     return
//     // } else {
//     //     const handleAnAPI = () => {
//     //         shouldWait = true;
//     //         setTimeout(async () => {
//     //             try {
//     //                 const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes/${episodeNo}`);
//     //                 const result = await response.json();
//     //                 setData(result?.data)
//     //             } catch (error) {
//     //                 console.log('Error while fetching an API', error)
//     //             }

//     //             shouldWait = false
//     //         }, 500)
//     //     }

//     // }

//     // useEffect(() => {
//     //     handleAnAPI()
//     //     // return () => clearTimeout(handleAnAPI() );
//     // }, [])

//     // return data;

//     const [data, setData] = useState(0);
//     let shouldWait = false;
//     if (shouldWait) return;
//     shouldWait = true
//     setTimeout(async () => {
//         try {
//             const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes/${episodeNo}`);
//             const result = await response.json();
//             setData(result?.data)
//         } catch (error) {
//             console.log('Error while fetching an API', error)
//         }
//         shouldWait = false
//     }, 333)
//     return data;

// }

// export default apiThrottleHook;


// import React from 'react'

// const apiThrottleHook = ({ cb, delay = 333 }) => {

//     let shouldWait = false;
//     let waitingArgs;
//     const timeOutFunc = () => {
//         if (waitingArgs == null) {
//             shouldWait = false;
//         } else {
//             cb(...waitingArgs)
//             waitingArgs = null;
//             setTimeout(timeOutFunc, delay)
//         }

//         return (...args) => {
//             if (shouldWait) {
//                 waitingArgs = args;
//                 return
//             }
//             cb(...args)
//             shouldWait = true;
//             setTimeout(timeOutFunc, delay)
//         }
//     }

// }

// export default apiThrottleHook
import React, { useEffect, useRef } from 'react';

const apiThrottleHook = ({ func, delay = 333 }) => {
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            const now = Date.now();
            const timeElapsed = now - lastExecuted.current;
            if (timeElapsed >= delay) {
                func();
                lastExecuted.current = now;
            }
        }, delay - (Date.now() - lastExecuted.current));

        return () => clearTimeout(handler);
    }, [func, delay]);

    // console.log(lastExecuted)
    return lastExecuted;
};

export default apiThrottleHook;