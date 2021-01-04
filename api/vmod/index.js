const { getVersionFromVmod } = require('../../src/version');
const { createServerlessFunction } = require('../vercel-serverless');

module.exports = createServerlessFunction('vmod', 'v.mod', getVersionFromVmod);
