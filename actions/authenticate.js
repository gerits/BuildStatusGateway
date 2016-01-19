var github = require('../rest/github');
var travisci = require('../rest/travisci');

var authenticate = {};

authenticate.execute = function(authorization, callback) {
	github.createAuth(authorization, function(result) {
		var github_id = result.id;
		var github_token = result.token;
		
		travisci.createAuth(github_token, function(result) {
			var token = result.access_token;

			github.deleteAuth(github_id, authorization, function() {
			});
			
			callback({
				'accessToken' : token
			});
		});

	});
}

module.exports = authenticate;