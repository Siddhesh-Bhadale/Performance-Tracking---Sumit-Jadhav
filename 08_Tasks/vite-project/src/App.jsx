import { useEffect, useState } from 'react';
import './App.css'
import FolderStructure from './components/folderStructure/FolderStructure'
import VirtualisedList from './components/virtualisedList/VirtualisedList'
import { folderList, months } from './utils/staticData/StaticData'
import { getPreviousMonths } from './utils/utils';
import GridComponent from './components/gridComponent/GridComponent';

function App() {
  // index of an elemnt 
  const currentMonth = `Dec`;

  const index = months.indexOf(currentMonth)
  // const currentMonth = new Date().getMonth();

  const PreviousMonths = getPreviousMonths(index);
  const [matrixInput, setMatrixInput] = useState(2)

  return (
    <div className='Parent_container'>
      <h2> Custom Grid Component </h2>
      {/* <div className='left_container'>
        <strong className='file_label'>File - Explorer</strong>
        <FolderStructure list={folderList} />
      </div> */}
      {/* <div style={{ width: '100%' }}>
        <span style={{ padding: '1rem' }}>{`current month:-`}{!currentMonth ? "please ensure ur month is valid" : months[index]}</span>
        {PreviousMonths?.map((item, idx) => (<li key={idx}>{item}</li>))}

      </div> */}
      <div style={{ height: '100%' }}>
        <div className='app_grid_parent'>
          <label className='grid_title'>Enter the active Cam Number :-</label>
          <input className="app_grid_input" placeholder='Enter only positive no' type='number' value={matrixInput} onChange={(e) => setMatrixInput(e.target.value)} />
        </div>
        <GridComponent input={matrixInput} />
      </div>

    </div>
  )
}

export default App


