import React, { useState } from 'react';
import folder from '../../assets/icons/folder.svg'
import openArrow from '../../assets/icons/down.svg'
import closeArrow from '../../assets/icons/right.svg'

const Folder = ({ length, name, onClick }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem', background: 'gray' }} onClick={() => onClick}>

            {length <= 0 && !length ? (<>
                {/* <img src={closeArrow} style={{ height: '20px', width: '20px', objectFit: 'contain' }} /> */}
            </>) : (<>
                {true ? (<>
                    <img src={openArrow} style={{ height: '20px', width: '20px', objectFit: 'contain' }} />
                </>) : (<>
                    <img src={closeArrow} style={{ height: '20px', width: '20px', objectFit: 'contain' }} />

                </>)}
            </>)}

            <img src={folder} style={{ height: '30px', width: '30px', objectFit: 'contain' }} />
            <label style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 'normal' }}>{name}</label>

        </div>
    )
}

export default Folder