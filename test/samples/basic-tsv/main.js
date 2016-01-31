import fruit from './fruit.tsv';

assert.deepEqual( fruit, [
	{ type: 'apples', count: 7 },
	{ type: 'pears', count: 4 },
	{ type: 'bananas', count: 5 }
]);
