var github = require('../rest/github');
var travisci = require('../rest/travisci');

var authenticate = {};

authenticate.execute = function(authorization, callback) {
	github.createAuth(authorization, function(result) {
		travisci.createAuth(result.token, function(result) {
			var token = result.access_token;
			github.deleteAuth(result.id, authorization, function() {
				callback({
					'accessToken' : token
				});
			});
		});
	});
}

module.exports = authenticate;