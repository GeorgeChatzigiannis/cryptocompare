import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const EnhancedTableHead = (props) => {
    const StyledTableCell = withStyles(() => ({
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

    const StyledTableSortLabel = withStyles(() => ({
        root: {
            color: `${grey[300]} !important`,
        },
        icon: {
            color: `${grey[300]} !important`,
        }
    }))(TableSortLabel)

    const { order, orderBy, onRequestSort, headCells} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const useStyles = makeStyles(() => ({
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }));

    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <StyledTableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </StyledTableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;
