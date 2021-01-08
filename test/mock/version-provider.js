const dummyVersionProvider = null;

const v0VersionProvider = () => '0.1.0';

const v1PlusVersionProvider = () => '1.1.0';

const throwableVersionProvider = () => {
	throw new Error('Not Found');
};

module.exports = {
	dummyVersionProvider,
	v0VersionProvider,
	v1PlusVersionProvider,
	throwableVersionProvider,
};
