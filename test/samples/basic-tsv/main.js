import fruit from './fruit.tsv';

assert.deepStrictEqual( fruit, [
	{ type: 'apples', count: '7' },
	{ type: 'pears', count: '4' },
	{ type: 'bananas', count: '5' }
]);
