const { createServerlessFunction } = require('../serverless-function-factory');
const {
	createVpkgVersionGetter,
} = require('../../provider/version/version-provider-factory');

module.exports = createServerlessFunction('vpkg', createVpkgVersionGetter());
