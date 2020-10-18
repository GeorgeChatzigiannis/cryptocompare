import React from 'react';
import { withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import grey from '@material-ui/core/colors/grey';

const EnhancedTableBody = (props) => {
    const { rows, order, orderBy } = props;

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: grey[800],
            fontWeight: 900,
            color: grey[300],
        },
        body: {
            fontSize: 14,
            color: grey[300],
        },
    }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: grey[800],
            },
            '&:nth-of-type(even)': {
                backgroundColor: grey[900],
            },
        },
    }))(TableRow);

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    return (
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .map((row) => {
                    return (
                        <StyledTableRow
                            hover
                            tabIndex={-1}
                            key={row.coinName}
                        >
                            <StyledTableCell component="th" scope="row" padding="none">
                                {row.coinName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.currentPrice}</StyledTableCell>
                            <StyledTableCell align="right">{row.openingPrice}</StyledTableCell>
                            <StyledTableCell align="right">{row.priceIncrease}</StyledTableCell>
                        </StyledTableRow>
                    );
                })}
        </TableBody>
    )
}

export default EnhancedTableBody;
