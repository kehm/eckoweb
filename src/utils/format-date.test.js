import formatDate from './format-date';

describe('Call function formatDate', () => {
    describe('Call function formatDate with only date true', () => {
        test('should return formatted date', () => {
            const date = formatDate('2022-01-17T04:33:12.000Z', true);
            expect(date).toEqual('17-1-2022');
        });
    });
    describe('Call function formatDate with only date false and two digit minutes', () => {
        test('should return formatted date with hours and minutes', () => {
            const date = formatDate('2022-01-17T04:33:12.000Z', false);
            expect(date).toEqual('17-1-2022 04:33');
        });
    });
    describe('Call function formatDate with only date false and two digit hours', () => {
        test('should return formatted date with hours and minutes', () => {
            const date = formatDate('2022-01-17T11:03:12.000Z', false);
            expect(date).toEqual('17-1-2022 11:03');
        });
    });
});
