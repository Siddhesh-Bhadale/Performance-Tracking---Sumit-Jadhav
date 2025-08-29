import React from 'react'
import LeftBtn from '../../../assets/icons/left.svg';
import RightBtn from '../../../assets/icons/right.svg'
import '../../../scss/components/dotsNbutton.scss'

const DotsNButton = ({ slides, activeIndex, onClick, onClickLeft, onClickRight, isDotVisible = false }) => {
    return (
        <div data-component="dotsNbtn-container">
            <img className="arrowBtnImg" src={LeftBtn} alt="slider left button" onClick={onClickLeft} />
            {/* <button onClick={handlePreviousClick}>prev</button> */}
            {isDotVisible === true && (<div className="dots-container">
                {slides.map((__, idx) => (
                    <span
                        key={idx}
                        className={`dot ${activeIndex === idx ? "active-dot" : ""}`}
                        onClick={() => onClick(idx)}
                    ></span>
                ))}
            </div>)}
            <img className="arrowBtnImg" src={RightBtn} alt="slider left button" onClick={onClickRight} />
            {/* <button onClick={handleNextClicke}>Next</button> */}
        </div>

    );
};

export default DotsNButton