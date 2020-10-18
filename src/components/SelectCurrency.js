import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SelectCurrency = (props) => {
    const { currencies, selectedCurrency: { currency }, setSelectedCurrency } = props;

    const classes = useStyles();

    const handleChange = (event) => {
        const selection = currencies.find(cr => cr.currency === event.target.value)
        setSelectedCurrency(selection);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-currency">Select Currency</InputLabel>
                <Select
                    native
                    value={currency}
                    onChange={handleChange}
                    inputProps={{
                        name: 'selectedCurrency',
                        id: 'select-currency',
                    }}
                >
                    {currencies.map( cr => {
                        return (
                            <option key={cr.currency} value={cr.currency}>{cr.currency}</option>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectCurrency;
