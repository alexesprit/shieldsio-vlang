const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

module.exports = {
	getFixtureContents,
};

async function getFixtureContents(fixtureName, suffix) {
	const fileName = `${fixtureName}-${suffix}`;

	const buffer = await readFileAsync(
		`./test/fixtures/${fixtureName}/${fileName}`
	);
	return buffer.toString();
}
