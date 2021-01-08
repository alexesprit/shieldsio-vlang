const { createServerlessFunction } = require('../serverless-function-factory');
const { createVmodVersionGetter } = require('../version-getter-factory');

module.exports = createServerlessFunction(
	'vpkg',
	'vpkg',
	createVmodVersionGetter()
);
