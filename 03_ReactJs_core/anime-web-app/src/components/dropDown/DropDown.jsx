import React, { useState } from "react";
import "../../scss/component/dropDown.scss";

const DropDown = ({ arr = [] }) => {
  const [selected, setSelected] = useState(arr[0]);
  return (
    <div data-component="DropDownComponent" className="dropDown">
      <select
        name="select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="select-container"
      >
        {arr.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
