var github = require('../rest/github');
var travisci = require('../rest/travisci');

var authenticate = {};

authenticate.execute = function(authorization, callback) {
	github.createAuth(authorization, function(result) {
		travisci.createAuth(result.token, function(result) {
			github.deleteAuth(result.id, authorization);

			callback({
				'accessToken' : result.access_token
			});
		});
	});
}

module.exports = authenticate;