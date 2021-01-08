const {
	getVersionFromVpkg,
} = require('../../src/provider/version/vpkg-provider');
const { createServerlessFunction } = require('../vercel-serverless');

module.exports = createServerlessFunction('vpkg', 'vpkg', getVersionFromVpkg);
