import DataGrid, {
  Column,
  SearchPanel,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import { DataItem, ColumnConfig } from "../App";
const pageSizes = [10, 25, 50, 100];

function DataGridWrapper({data,columns}: { data: DataItem[]; columns: ColumnConfig[]})
 {
  console.log(data);
  console.log(columns);
  
  let searchTimeout: ReturnType<typeof setTimeout>;

  const handleEditorPreparing = (e: any) => {
    if (e.parentType === "searchPanel") {
      e.editorOptions.onValueChanged = (args: { value: string }) => {
        const value = args.value || "";
        clearTimeout(searchTimeout);

        if (value.length >= 3) {
          // Trigger the search after a 1 second delay
          searchTimeout = setTimeout(() => {
            e.component.searchByText(value);
          }, 1000);
        } else {
          e.component.searchByText("");
        }
      };
    }
  };

  return (
    <>
     {columns.length > 0 ? (
    <DataGrid
      dataSource={data}
      showBorders={true}
      columnAutoWidth={true}
      allowColumnResizing={true}
      rowAlternationEnabled={true}
      headerFilter={{ visible: true }}
      onEditorPreparing={handleEditorPreparing}
      scrolling={{
        mode: "standard", 
      }}
      showColumnLines={false} 
    
      >
      <SearchPanel
        visible={true}
        highlightCaseSensitive={false}
        width={240}
        placeholder="Search..."
        
      />
      <Pager
        visible={true}
        allowedPageSizes={pageSizes}
        showPageSizeSelector={true}
      />
      <Paging defaultPageSize={12} />

      {/* Render columns dynamically */}
      {columns.map((column, index) => (
        <Column
          key={index}
          dataField={column.dataField}
          caption={column.caption}
          allowResizing={true}
        />
      ))}
    </DataGrid>
     ) : (
      <div>No columns to display.</div>
    )}
    </>
  );
}

export default DataGridWrapper;
