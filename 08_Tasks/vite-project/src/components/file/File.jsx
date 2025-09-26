import React from 'react'
import fileImg from '../../assets/icons/file.svg'

const File = ({ fileName }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem' }}>
            <img src={fileImg} style={{ height: '20px', width: '20px', objectFit: 'contain' }} />
            <label style={{ fontSize: '1rem', fontWeight: '900', lineHeight: 'normal' }}>{fileName}</label>
        </div>
    )
}

export default File