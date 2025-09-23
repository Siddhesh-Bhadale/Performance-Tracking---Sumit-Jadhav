import React, { useEffect, useState } from 'react'
const apiThrottleHook = (func, delay = 1000, idx) => {
    const [isThrottled, setIsThrottled] = useState(false)

    useEffect(() => {

        if (isThrottled) return;
        setIsThrottled(true)
        const handler = setTimeout(async () => {
            func();
            setIsThrottled(false)
        }, delay * idx)
        return () => { clearTimeout(handler) }
    }, [func, delay, idx, isThrottled])
    // return data;
}

export default apiThrottleHook;
