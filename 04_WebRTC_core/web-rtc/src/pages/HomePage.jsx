import AnswerExchange from "../components/answerExchange/AnswerExchange";
import CameraCard from "../components/cameraCard/CameraCard";
import InfoContainer from "../components/header/InfoContainer";
import "../scss/homePage.scss"
const HomePage = () => {
    return (
        <div data-components='homePage'>
            <InfoContainer />
            <div className="cards-container">
                <CameraCard heading={"Your Camera (Local)"}
                 isBtnVisible={true} 
                 tip={"Requires HTTPS or localhost for camera access."} />
                <CameraCard heading={"Remote Stream"} />

            </div>
            <div className="answer-container">
                <AnswerExchange/>
            </div>

        </div>
    )
}

export default HomePage;