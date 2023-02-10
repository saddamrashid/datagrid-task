import React, { useMemo } from "react";
import { useQuery } from "react-query";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useCheckMobileView } from "../../hooks";
import { getTransactions } from "../../utils";

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
    const { data: transactions, error, isLoading } = useQuery("transactionsData", getTransactions);
    const { isMobileView } = useCheckMobileView();

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

    if (isLoading) return <span>Loading...</span>;

    if (error) return <span>Error while fetching transactions.</span>;

    return (
        <CacheProvider value={createCache({ key: "mui", prepend: true })}>
            <MUIDataTable
                title=''
                data={transactions?.data ?? []}
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
