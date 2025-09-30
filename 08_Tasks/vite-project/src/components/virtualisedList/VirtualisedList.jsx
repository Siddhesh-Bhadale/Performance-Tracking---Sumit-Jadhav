import React, { useEffect, useState } from 'react'

const VirtualisedList = ({ height, width, itemHeight }) => {
    const list = Array.from(({ length: 100000 }), (_, idx) => idx + 1)
    const [indices, setIndices] = useState([0, Math.ceil(height / itemHeight)])
    const sliceList = list.slice(indices[0], indices[1] + 1);

    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        const newStartIndex = Math.floor(scrollTop / itemHeight)
        const newEndIndex = newStartIndex + Math.floor(height / itemHeight)
        setIndices([newStartIndex, newEndIndex]);
    }

    useEffect(() => {
        console.log("slice list chnaged", sliceList)
    }, [sliceList])
    return (
        <div style={{ height: `${height}px`, width: `${width}px`, border: `1px solid white`, overflow: 'auto', position: 'relative' }}
            onScroll={(e) => handleScroll(e)}
        >
            <div style={{ height: list.length * itemHeight, background: 'green', }}>
                {sliceList?.map((item, idx) => {
                    return (<div style={{ padding: `1rem`, height: `${itemHeight}px`, width: '100%', background: 'orange', marginTop: '10px', position: 'absolute', top: (indices[0], idx) + itemHeight }} key={idx}>
                        {`Item:- ${item}`}
                    </div>)
                })}
            </div>

        </div>
    )
}

export default VirtualisedList