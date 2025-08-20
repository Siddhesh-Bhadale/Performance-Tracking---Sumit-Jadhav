import "../../../scss/component/streamingDetails.scss"
import { Streaminglogo } from "../../../utils/TextConstants.js";
import StreamingCard from '../../cardTemplate/StreamingCard.jsx'

const StreamingDetails = ({ paramId, data }) => (
  <div data-component='StreamingDetails'>
    {data?.map((item, index) => (
      <div className='card' key={index}>
        <StreamingCard
          isCircle={true}
          name={item?.name}
          image={
            Streaminglogo[
              Object.keys(Streaminglogo).find(key =>
                item?.name?.toLowerCase().replace(/\s+/g, "").includes(key.toLowerCase())
              )
            ] || Streaminglogo.Netflix
          }
        />
      </div>
    ))}
  </div>
);

export default StreamingDetails;
