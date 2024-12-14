import { useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css"; 
import axios from "axios";
import DataGridWrapper from "./components/DataGridWrapper";
import Sidebars from "./components/Sidebars";
import Loading from "./components/Loading";

export interface DataItem {
  id: string;
  klasifikacija: string;
  naziv: string;
  karakteristikaA: string;
  karakteristikaB: string;
  karakteristikaC: string;
  karakteristikaD: string;
  karakteristikaE: string;
}

export interface ColumnConfig {
  dataField: string ;
  caption: string ;
}

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Separate state for grid and hidden columns
  const [gridColumns, setGridColumns] = useState<ColumnConfig[]>([
    { dataField: "id", caption: "ID" },
    { dataField: "klasifikacija", caption: "Klasifikacija" },
    { dataField: "naziv", caption: "Naziv" },
    { dataField: "karakteristikaA", caption: "Karakteristika A" },
    { dataField: "karakteristikaB", caption: "Karakteristika B" },
  ]);

  const [hiddenColumns, setHiddenColumns] = useState<ColumnConfig[] >([
    { dataField: "karakteristikaC", caption: "Karakteristika C" },
    { dataField: "karakteristikaD", caption: "Karakteristika D" },
    { dataField: "karakteristikaE", caption: "Karakteristika E" },
  ]);


  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD;
        const response = await axios.get(apiUrl);
        setTimeout
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle double-click on a grid column
  const handleGridColumnDoubleClick = (column: ColumnConfig) => {
    // Move the column to hiddenColumns
    setGridColumns((prev) =>
      prev.filter((col) => col.dataField !== column.dataField)
    );
    setHiddenColumns((prev) => [...prev, column]);
  };

  // Handle double-click on a hidden column
  const handleHiddenColumnDoubleClick = (column: ColumnConfig) => {
    // Move the column back to gridColumns
    setHiddenColumns((prev) =>
      prev.filter((col) => col.dataField !== column.dataField)
    );
    setGridColumns((prev) => [...prev, column]);
  };

  if (loading) { 

  return < Loading  /> 
  }

  return (
    <div className="container" >
      <div>
        <DataGridWrapper data={data} columns={gridColumns} />
      </div>
      <div>
        <Sidebars
          hiddenColumns={hiddenColumns}
          gridColumns={gridColumns}
          handleGridColumnDoubleClick={handleGridColumnDoubleClick}
          handleHiddenColumnDoubleClick={handleHiddenColumnDoubleClick}
        />
      </div>
    </div>
  );
}

export default App;
