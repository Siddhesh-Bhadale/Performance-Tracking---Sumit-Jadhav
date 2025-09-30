import { gridMaker } from '../../utils/utils';
import './GridComponent.css'

const GridComponent = (props) => {
    const { input } = props;
    const n = gridMaker(input)
    // const N = Math.ceil(Math.sqrt(input))

    const createGrid = () => {
        let currentIndex = 0;
        return Array.from(({ length: Number(n.charAt(0)) }),
            () => Array.from(({ length: Number(n.charAt(0)) }),
                () => { return { id: currentIndex += 1, value: currentIndex <= input ? 'online' : 'offline' } }));
    }
    const active2DArray = createGrid();
    return (
        <div style={{ height: '100%' }}>
            <div className='grid_data_container'>
                {input < 0 && <span>Provided Input Number cant be Negative</span>}
                <span className='matrix_count_span' >Matrix:- {n}</span>
            </div>

            {active2DArray.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: `repeat(${Number(n.charAt(0))},1fr)`, gap: '1rem' }}>
                        {row?.map((col, colIdx) => {
                            return (
                                <div key={colIdx + rowIdx} className='grid_cam_item'>
                                    <span className={`span_tag ${col?.value == 'online' ? 'activeTag' : ''}`} >{col?.value}</span>
                                    {`Cam - ${col?.id}`} </div>
                            )
                        })}
                    </div>
                )
            })}
        </div >
    )
}

export default GridComponent