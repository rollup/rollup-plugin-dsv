import * as assert from 'assert';
import { rollup } from 'rollup';
import dsv from '..';

process.chdir( __dirname );

function executeBundle ( bundle ) {
	const generated = bundle.generate({
		format: 'cjs'
	});

	const fn = new Function ( 'module', 'assert', generated.code );
	let module = {};

	fn( module, assert );

	return module;
}

describe( 'rollup-plugin-commonjs', () => {
	it( 'converts a csv file', () => {
		return rollup({
			entry: 'samples/basic-csv/main.js',
			plugins: [ dsv() ]
		}).then( executeBundle );
	});

	it( 'converts a tsv file', () => {
		return rollup({
			entry: 'samples/basic-tsv/main.js',
			plugins: [ dsv() ]
		}).then( executeBundle );
	});

	it( 'uses a custom processor', () => {
		const parse = value => {
			return isNaN( +value ) ? value : +value;
		};

		return rollup({
			entry: 'samples/process/main.js',
			plugins: [
				dsv({
					processRow: function ( row ) {
						Object.keys( row ).forEach( key => {
							row[ key ] = parse( row[ key ] );
						});
					}
				})
			]
		}).then( executeBundle );
	});
});
