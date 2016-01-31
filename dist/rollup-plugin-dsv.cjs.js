'use strict';

function _interopDefault (ex) { return 'default' in ex ? ex['default'] : ex; }

var path = require('path');
var d3Dsv = require('d3-dsv');
var toSource = _interopDefault(require('tosource'));
var rollupPluginutils = require('rollup-pluginutils');

var parsers = { '.csv': d3Dsv.csv, '.tsv': d3Dsv.tsv };

function dsv() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	var filter = rollupPluginutils.createFilter(options.include, options.exclude);

	return {
		transform: function transform(code, id) {
			if (!filter(id)) return null;

			var ext = path.extname(id);
			if (!(ext in parsers)) return null;

			var rows = parsers[ext].parse(code);

			return {
				code: 'export default ' + toSource(rows) + ';',
				map: { mappings: '' }
			};
		}
	};
}

module.exports = dsv;