import React from 'react'
import '../../scss/cameraCard.scss';

const CameraCard = ({heading,tip,isBtnVisible=false}) => {
  return (
    <div data-components='cameraCard'>
        <label>{heading}</label>
        <div className='video-container'></div>
       { isBtnVisible === true ? (<div className='btn-container'>
            <button>Start Camera</button>
            <button>Toggle Mute</button>
            <button>Toggle Camera</button>
            <button>Hang up</button>
        </div>):( <label className='note'>Peer not connected</label>)}
        <label className='note'>{tip}</label>
    </div>
  )
}

export default CameraCard