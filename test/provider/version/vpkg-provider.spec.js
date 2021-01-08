const {
	getVersionFromVpkg,
} = require('../../../provider/version/vpkg-provider');
const { getFixtureContents } = require('../../contents-provider');

test('should return version from valid vpkg.json file', async () => {
	const fileContents = await getFixtureContents('vpkg', 'valid');
	const version = getVersionFromVpkg(fileContents);

	expect(version).toBe('0.1.0');
});

test('should throw error if vpkg.json is not valid', async () => {
	const fileContents = await getFixtureContents('vpkg', 'invalid');

	expect(() => getVersionFromVpkg(fileContents)).toThrow(
		'Invalid vpkg.json file'
	);
});

test('should throw error if vpkg.json contains no version', async () => {
	const fileContents = await getFixtureContents('vpkg', 'no-version');

	expect(() => getVersionFromVpkg(fileContents)).toThrow(
		'vpkg.json file does not contain version info'
	);
});
