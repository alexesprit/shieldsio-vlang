const {
	getVersionFromVmod,
} = require('../../src/provider/version/vmod-provider');
const { createServerlessFunction } = require('../vercel-serverless');

module.exports = createServerlessFunction('vmod', 'v.mod', getVersionFromVmod);
