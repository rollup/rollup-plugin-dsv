import { extname } from 'path';
import { csv, tsv } from 'd3-dsv';
import toSource from 'tosource';
import { createFilter } from 'rollup-pluginutils';

const parsers = { '.csv': csv, '.tsv': tsv };

export default function dsv ( options = {} ) {
	const filter = createFilter( options.include, options.exclude );

	return {
		transform ( code, id ) {
			if ( !filter( id ) ) return null;

			const ext = extname( id );
			if ( !( ext in parsers ) ) return null;

			const rows = parsers[ ext ].parse( code );

			return {
				code: `export default ${toSource( rows )};`,
				map: { mappings: '' }
			};
		}
	};
}
