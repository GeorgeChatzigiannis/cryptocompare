import { clone } from 'ramda';
import { transformRowData } from '../../actions/index';
import * as mockApiResponse from '../mocks/apiResponse.json'

describe('transformRowData', () => {
    const selectedCurrency = {
        currency: 'USD',
        symbol: '$',
    };
    test('should return an empty array if selected currency is not provided', () => {
        const result = transformRowData(mockApiResponse, undefined)
        expect(result.length).toEqual(0);
    });
    test('should return an empty array if selected currency does not have a currency property', () => {
        const result = transformRowData(mockApiResponse, 'USD');
        expect(result.length).toEqual(0);
    });
    test('should return an empty array if response is not provided', () => {
        const result = transformRowData(undefined, selectedCurrency);
        expect(result.length).toEqual(0);
    });
    test('should return an empty array if RAW property is not an object', () => {
        const clonedResponse = clone(mockApiResponse);
        clonedResponse['RAW'] = 'random_string';
        const result = transformRowData(undefined, selectedCurrency);
        expect(result.length).toEqual(0);
    });
    test('should return an array if RAW property is not an object', () => {
        const clonedResponse = clone(mockApiResponse);
        clonedResponse['RAW'] = 'random_string';
        const result = transformRowData(undefined, selectedCurrency);
        expect(result.length).toEqual(0);
    });
    describe('when fetching API data', () => {
        const result = transformRowData(mockApiResponse, selectedCurrency);
        test('it should return an array', () => {
            expect(Array.isArray(result)).toBeTruthy();
        });
        test('it should return an array that include' +
            ' coinName, currentPrice, openingPrice and priceIncrease properties', () => {
            expect(result[0].coinName).toBeDefined();
            expect(result[0].currentPrice).toBeDefined();
            expect(result[0].openingPrice).toBeDefined();
            expect(result[0].priceIncrease).toBeDefined();
        });
    });
});
