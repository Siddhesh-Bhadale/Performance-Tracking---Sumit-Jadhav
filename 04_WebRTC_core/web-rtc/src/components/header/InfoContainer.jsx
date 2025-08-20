import React from 'react'
import "../../scss/infoContainer.scss"

const InfoContainer = () => {
    const steps=["1) Start Camera","2) Create/Copy Offer (Peer A)","3) Paste/Answer (Peer B)","4) Paste Answer (Peer A)"]
    



  return (
    <div data-component='infoContainer'>
        <h2>WebRTC Copy-Paste Demo (No Server)</h2>
        <div className='list-container'>
            {steps?.map((item,index)=>{
                return(
                    <span key={index}>{item}</span>
                )
            })}
        </div>
            <label>Tip: open this same file in two tabs/windows.</label>

    </div>
  )
}

export default InfoContainer