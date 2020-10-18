import React, { useEffect, useState } from 'react';
import { isEmpty } from "ramda";
import { CircularProgress } from '@material-ui/core';

import EnhancedTable from './EnhancedTable/EnhancedTable';
import { fetchData, transformRowData } from "../actions";

const DataTable = (props) => {
    const { selectedCurrency, selectedCurrency: { currency } } = props
    const [isFetching, setIsFetching] = useState(true)
    const [apiResponse, setApiResponse] = useState({});
    const [rows, setRows] = useState({});

    useEffect(  () => {
        if (isEmpty(apiResponse)) {
            fetchData(setIsFetching, setRows, selectedCurrency, setApiResponse)
        } else {
            setRows(transformRowData(apiResponse, selectedCurrency));
        }
    }, [apiResponse, selectedCurrency])

    const headCells = [
        { id: 'coinName', numeric: false, disablePadding: true, label: 'Coin Name' },
        { id: 'currentPrice', numeric: true, disablePadding: false, label: `Current Price (${currency})` },
        { id: 'openingPrice', numeric: true, disablePadding: false, label: `Opening Price (${currency})` },
        { id: 'priceIncrease', numeric: true, disablePadding: false, label: 'Price Increase' },
    ];

    if (!isFetching && rows.length > 0) {
        return (
            <EnhancedTable
                rows={rows}
                headCells={headCells}
            />
        )
    } else {
        return (
            <CircularProgress />
        )
    }
}

export default DataTable;
