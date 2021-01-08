const { createServerlessFunction } = require('../serverless-function-factory');
const { createVpkgVersionGetter } = require('../version-provider-factory');

module.exports = createServerlessFunction('vpkg', createVpkgVersionGetter());
