# rollup-plugin-dsv

Convert .csv and .tsv files into JavaScript modules with [d3-dsv](https://github.com/d3/d3-dsv).


## Installation

```bash
npm install --save-dev rollup-plugin-dsv
```


## Usage

```js
import { rollup } from 'rollup';
import dsv from 'rollup-plugin-dsv';

rollup({
  entry: 'main.js',
  plugins: [ dsv() ]
}).then(...)
```

Inside your code, you can do this sort of thing:

```bash
# fruit.csv
type,count
apples,7
pears,4
bananas,5
```

```js
// main.js
import fruit from './fruit.csv';

assert.deepEqual( fruit, [
	{ type: 'apples',  count: '7' },
	{ type: 'pears',   count: '4' },
	{ type: 'bananas', count: '5' }
]);
```

You can also import `.tsv` files.

### Custom processors

You can supply a function that processes each row in the returned array – for example turning numeric values into numbers. The function can either manipulate the existing row object, or return an entirely new one.

```js

rollup({
  entry: 'main.js',
  plugins: [
    dsv({
      processRow: function ( row, id ) {
        Object.keys( row ).forEach( key => {
          var value = row[ key ];
          row[ key ] = isNaN( +value ) ? value : +value;
        });
      }
    })
  ]
}).then(...)
```

## License

MIT
