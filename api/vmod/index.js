const { createServerlessFunction } = require('../serverless-function-factory');
const { createVmodVersionGetter } = require('../version-provider-factory');

module.exports = createServerlessFunction('v.mod', createVmodVersionGetter());
