var request = require('request');

const URI = 'https://api.github.com';

module.exports = {

	createAuth : function(auth, callback) {
		var requestData = {
			"scopes" : [ "read:org", "user:email", "repo_deployment",
					"repo:status", "write:repo_hook" ],
			"note" : "Travis Build Status"
		};

		var options = {
			url : URI + '/authorizations',
			headers : {
				'User-Agent' : 'TravisBuildStatus/1.0.0',
				'Content-type' : 'application/json',
				'Authorization': auth
			},
			json : requestData,
		};

		request.post(options, function(err, res, body) {
			if (err) {
				console.log(err);
			}
			console.log(body);
			callback(body);
		});
	},

	deleteAuth : function(id, auth) {
		var options = {
			url : URI + '/authorizations/' + id,
			headers : {
				'User-Agent' : 'TravisBuildStatus/1.0.0',
				'Content-type' : 'application/json',
				'Authorization': auth
			}
		};

		request.del(options, function(err, res, body) {
			if (err) {
				console.log(err);
			}

			if (!err && res.statusCode == 200) {
				return JSON.parse(body);
			}
		});
	}
}
