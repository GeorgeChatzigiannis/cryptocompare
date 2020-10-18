import { pathOr } from "ramda";

const fetchData = (setIsFetching, setRows, selectedCurrency, setApiResponse) => {
    const baseURL = 'https://min-api.cryptocompare.com/data/pricemultifull?';
    const fsyms = ['BTC', 'BCH', 'LTC', 'ETH', 'BNB', 'TRX', 'LINK', 'BAT', 'NEO', 'EOS'];
    const tsyms = ['USD', 'EUR'];
    fetch(`${baseURL}fsyms=${fsyms.join()}&tsyms=${tsyms.join()}`)
    .then(response => response.json())
    .then(function (data) {
        setIsFetching(false);
        setApiResponse(data);
    }).catch(function (err) {
        setIsFetching(false);
        setRows([]);
        console.log('Request failed', err);
    });
};

const transformRowData = (response, selectedCurrency) => {
    const transformedData = [];
    const rawData = pathOr(undefined, ['RAW'], response)
    if (!rawData) return transformedData;
    const cryptos = Object.keys(rawData);
    if (!selectedCurrency || !selectedCurrency.currency ||
        !cryptos || cryptos.length < 1
    ) return transformedData;
    cryptos.forEach(cr => {
         const singleCurrencyInfo = rawData[cr][selectedCurrency.currency];
         transformedData.push({
             coinName: cr,
             currentPrice: singleCurrencyInfo['PRICE'],
             openingPrice: Math.round(singleCurrencyInfo['OPENDAY'] * 100) / 100,
             priceIncrease:
                 `${singleCurrencyInfo['CHANGEPCTDAY'].toFixed(4)}% 
                 (${selectedCurrency.symbol}${singleCurrencyInfo['CHANGEDAY'].toFixed(4)})`
         });
    })
    return transformedData;
};

export {
    fetchData,
    transformRowData
};
