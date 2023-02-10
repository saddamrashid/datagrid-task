import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { DataGrid } from './components'

const queryClient = new QueryClient();

const columns = [
  { label: "Name", key: "name", type: "string" },
  { label: "Date", key: "date", type: "date" },
  { label: "Category", key: "category", type: "string" },
  { label: "Amount", key: "amount", type: "number" },
  { label: "Created At", key: "created_at", type: "date" },
];

function App() {
  return (
      <div className="App">
        <div className='datagrid-container'>
          <h5>Transactions Grid</h5>
          <DataGrid columns={columns} title='name' subtitle='category'/>
        </div>
      </div>
  );
}

export default App;
