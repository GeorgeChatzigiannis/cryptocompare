import React from 'react';
import DataTable from './components/DataTable';
import SelectCurrency from "./components/SelectCurrency";

const App = () => {
    const currencies = [
        {
            currency: 'USD',
            symbol: '$',
        },
        {
            currency: 'EUR',
            symbol: '€',
        },
    ];
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[0]);

    return [
        <DataTable
            key='DataTable'
            selectedCurrency={selectedCurrency}
        />,
        <SelectCurrency
            key='SelectCurrency'
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
        />
    ];
};

export default App;
