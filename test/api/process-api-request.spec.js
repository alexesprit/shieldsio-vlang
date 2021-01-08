const { processApiRequest } = require('../../api/process-api-request');
const {
	throwableVersionProvider,
	v0VersionProvider,
	v1PlusVersionProvider,
	dummyVersionProvider,
} = require('../mock/version-provider');

test('it should return success response for v0 version', async () => {
	const response = await processApiRequest(
		'/api/vmod/owner/repo/ref',
		'dummy',
		v0VersionProvider
	);

	expect(response).toEqual({
		schemaVersion: 1,
		color: 'orange',
		label: 'dummy',
		message: '0.1.0',
		cacheSeconds: 3600,
	});
});

test('it should return success response for v1+ version', async () => {
	const response = await processApiRequest(
		'/api/vmod/owner/repo/ref',
		'dummy',
		v1PlusVersionProvider
	);

	expect(response).toEqual({
		schemaVersion: 1,
		color: 'blue',
		label: 'dummy',
		message: '1.1.0',
		cacheSeconds: 3600,
	});
});

test('it should return success response without ref', async () => {
	const response = await processApiRequest(
		'/api/vmod/owner/repo',
		'dummy',
		v1PlusVersionProvider
	);

	expect(response).toEqual({
		schemaVersion: 1,
		color: 'blue',
		label: 'dummy',
		message: '1.1.0',
		cacheSeconds: 3600,
	});
});

test('it should return error response if version provider returns error', async () => {
	const response = await processApiRequest(
		'/api/vmod/owner/repo',
		'dummy',
		throwableVersionProvider
	);

	expect(response).toEqual({
		error: 'Not Found',
	});
});

test('it should return error response if repo name is not specified', async () => {
	const response = await processApiRequest(
		'/api/vmod/owner',
		'dummy',
		dummyVersionProvider
	);

	expect(response).toEqual({
		error: 'repo name is not specified',
	});
});

test('it should return error response if owner name is not specified', async () => {
	const response = await processApiRequest(
		'/api/vmod/',
		'dummy',
		dummyVersionProvider
	);

	expect(response).toEqual({
		error: 'owner name is not specified',
	});
});
