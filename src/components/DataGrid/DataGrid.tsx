import React, { useState, useEffect, useMemo } from "react";
import { useGetTransactions } from "../../hooks";
import CircularProgress from "@mui/material/CircularProgress";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

interface GridProps {
    columns: ColumnsItems[];
    title?: string;
    subtitle?: string;
}
interface ColumnsItems {
    label: string;
    key: string;
    type: string | number;
}

export const DataGrid = ({columns, title, subtitle} : GridProps) => {
  const { data, error, loading } = useGetTransactions();

  const isMobileLimit = () => window.innerWidth < 600;
  const [isMobileView, setIsMobileView] = useState(isMobileLimit());

  const handleUpdateView = () => {
    setIsMobileView(isMobileLimit());
  };

  useEffect(() => {
    window.addEventListener("resize", handleUpdateView);
    return () => {
      window.removeEventListener("resize", handleUpdateView);
    };
  }, []);

  const updatedColumns = useMemo(() => {
    if (isMobileView) {
      if (title?.length && subtitle?.length) {
        const filteredColumns = columns.filter((item) => item.key === title || item.key === subtitle);
        if (filteredColumns[0].key !== title) filteredColumns.reverse();
        return filteredColumns.map((column) => ({
          name: column.key,
          label: column.label,
        }));
      } else {
        return columns.slice(0, 2)
          .map((column) => ({ name: column.key, label: column.label }));
      }
    } else
      return columns.map((item) => ({ name: item.key, label: item.label }));
  }, [columns, title, subtitle, isMobileView]);

  if (loading) return <div><CircularProgress /></div>;

  if (error) return <div><span>{error}</span></div>;

  return (
    <CacheProvider value={createCache({ key: "mui", prepend: true })}>
        <MUIDataTable
            title=''
            data={data ?? []}
            columns={updatedColumns}
            options={{
                viewColumns: false,
                selectableRowsHideCheckboxes: true,
                search: false,
                print: false,
                filter: false,
                download: false,
                responsive: "simple"
            }}
        />
    </CacheProvider>
  );
};

export default DataGrid;
