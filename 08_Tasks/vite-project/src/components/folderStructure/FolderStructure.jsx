import { useState } from "react";
import './FolderStructure.css'
import folder from '../../assets/icons/folder.svg';
import file from '../../assets/icons/file.svg'
import right from '../../assets/icons/right.svg'

function FolderStructure({ list }) {
    return (
        <div className="folder-structure">
            {list?.map((item, index) => (
                <FolderItem key={index} item={item} />
            ))}
        </div>
    );
}

function FolderItem({ item }) {
    const [isOpen, setIsOpen] = useState(false);
    const type = item.hasOwnProperty("nodes");

    const handleOpenItem = (item) => {
        // console.log("Item Clicked", isOpen, "---item--", item)
        setIsOpen(!isOpen)
        // alert(`${type ? 'Folder' : 'File'} clicked ${isOpen == true ? 'close' : 'opened'}`)
    }
    return (
        <div className="folder-item">
            <div className="folder-label" onClick={() => handleOpenItem(item)}>
                {type && item.nodes.length > 0 && (
                    <img src={right} className={`arrow ${isOpen ? "active" : ''}`} />
                )}
                <img className="icon" src={type ? folder : file} />
                <span className="name">{item?.name}</span>
            </div>
            {isOpen && type && item.nodes.length > 0 && (
                <FolderStructure list={item.nodes} />
            )}
        </div>
    );
} export default FolderStructure;