import lower from './lower.csv';
import upper from './upper.csv';

assert.deepStrictEqual( lower, [
	{ type: 'apples', count: 7 },
	{ type: 'pears', count: 4 },
	{ type: 'bananas', count: 5 }
]);

assert.deepStrictEqual( upper, [
	{ type: 'APPLES', count: 7 },
	{ type: 'PEARS', count: 4 },
	{ type: 'BANANAS', count: 5 }
]);
