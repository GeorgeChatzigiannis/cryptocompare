import React from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableBody from './EnhancedTableBody';

const EnhancedTable = (props) => {

    const { headCells, rows } = props;
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('priceIncrease');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div>
            <Paper>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <EnhancedTableBody
                            rows={rows}
                            order={order}
                            orderBy={orderBy}
                        />
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default EnhancedTable;
