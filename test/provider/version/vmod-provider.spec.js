const {
	getVersionFromVmod,
} = require('../../../src/provider/version/vmod-provider');
const { getFixtureContents } = require('../../contents-provider');

const dummyRepoContext = null;

test('should return version from valid v.mod file', async () => {
	const fileContents = await getFixtureContents('vmod', 'valid');
	const version = getVersionFromVmod(dummyRepoContext, fileContents);

	expect(version).toBe('0.1.0');
});

test('should throw error if v.mod is not valid', async () => {
	const fileContents = await getFixtureContents('vmod', 'invalid');

	expect(() => getVersionFromVmod(dummyRepoContext, fileContents)).toThrow(
		'v.mod file does not contain version info'
	);
});
