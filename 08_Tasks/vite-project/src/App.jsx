import React, { useState } from 'react';
import { folderStructure } from './utils/staticData/StaticData';
import fileImg from './assets/icons/file.svg';
import folder from './assets/icons/folder.svg'
import openArrow from './assets/icons/right.svg'
import './App.css'

const FileExplorer = ({ nodes }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const [openFolder, setOpenFolder] = useState(nodes[0])
  const handleOnclick = (e, item) => {
    // console.log(openFolder)
    // setOpenFolder(item)
    // console.log("----------", item, "-------")
    // console.log("fnn condition", openFolder.nodes?.length == item?.nodes?.length && !isOpen)
    // setIsOpen(openFolder.nodes?.length == item?.nodes?.length ? !isOpen : false)
    // setIsOpen((prev) => {
    //   // console.log(prev, item.name)
    //   return !isOpen
    // })
    // e.stopPropagation()
    setIsOpen(!isOpen)


  }
  return (
    <div className='fileExplorer-container' >
      {nodes.map((item, index) => {
        const type = item.hasOwnProperty("nodes")
        return (<div key={index} className='fileExplore-item-container' >
          <div
            className={`item-container ${type ? "folder_contianer" : ""}`}
            onClick={(e) => { (type && item?.nodes?.length > 0) && handleOnclick(item) }}>
            {(type && item?.nodes?.length > 0) &&
              <img src={openArrow}
                className={`down_img ${isOpen ? "rightArrow" : ""}`} />}
            <img className='folder_img' src={type ? folder : fileImg} />
            <label className='folder_name'>{item?.name}</label>
          </div>

          {isOpen && item?.nodes && item?.nodes?.length > 0 && (
            <FileExplorer nodes={item.nodes} />
          )}
        </div>)
      }
      )}
    </div>
  );
};


const App = () => {
  return (
    <div className='parent-container' >
      <h1>File Explorer</h1>
      <FileExplorer nodes={folderStructure} />
    </div>
  );
};


export default App;







