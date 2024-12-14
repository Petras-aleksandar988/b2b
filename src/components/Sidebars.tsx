import {  ColumnConfig } from '../App'; 

interface SidebarsProps {
  hiddenColumns: ColumnConfig[]; 
  gridColumns: ColumnConfig[]; 
  handleGridColumnDoubleClick: (column: ColumnConfig) => void; 
  handleHiddenColumnDoubleClick: (column: ColumnConfig) => void; 
}

function Sidebars({
  hiddenColumns,
  gridColumns,
  handleGridColumnDoubleClick,
  handleHiddenColumnDoubleClick,
}: SidebarsProps) {

  return (
    <>
         {/* Sidebar for columns outside the grid */}
         <div className='sidebar-wrapper' >
         <ul style={{ listStyleType: 'none', padding: 0 }}>
           {hiddenColumns.map((column, index) => (
             <li className='outside-columns'
               key={index}
               style={{ userSelect: 'none' }}
               onDoubleClick={() => handleHiddenColumnDoubleClick(column)}
             >
               {column.caption}
             </li>
           ))}
         </ul>
       </div>
    {/* Sidebar for columns inside the grid */}
    <div className='sidebar-wrapper'>
 <ul style={{ listStyleType: 'none', padding: 0 }}>
   {gridColumns.map((column, index) => (
     <li  className='inside-columns'
       key={index}
       style={{ userSelect: 'none' }}
       onDoubleClick={() => handleGridColumnDoubleClick(column)}
     >
       {column.caption}
     </li>
   ))}
 </ul>
</div>
</>
  )
}

export default Sidebars