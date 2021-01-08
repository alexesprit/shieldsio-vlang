const { createServerlessFunction } = require('../serverless-function-factory');
const { createVpkgVersionGetter } = require('../version-getter-factory');

module.exports = createServerlessFunction('vpkg', createVpkgVersionGetter());
