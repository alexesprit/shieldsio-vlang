const { createServerlessFunction } = require('../serverless-function-factory');
const {
	createVmodVersionGetter,
} = require('../../provider/version/version-provider-factory');

module.exports = createServerlessFunction('v.mod', createVmodVersionGetter());
