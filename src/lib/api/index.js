const apiResponse = require('./response');
const ApiException = require('./exception');

module.exports = {
	apiResponse,
	...ApiException,
};
