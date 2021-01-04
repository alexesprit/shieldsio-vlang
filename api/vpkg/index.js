const { getVersionFromVpkg } = require('../../src/version');
const { createServerlessFunction } = require('../vercel-serverless');

module.exports = createServerlessFunction('vpkg', 'vpkg', getVersionFromVpkg);
