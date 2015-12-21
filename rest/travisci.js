var request = require('request');

const URI = 'https://api.travis-ci.org';

module.exports = {

	createAuth : function(githubToken, callback) {
		var requestData = {
			"github_token" : githubToken
		};

		var options = {
			url : URI + '/auth/github',
			headers : {
				'User-Agent' : 'TravisBuildStatus/1.0.0',
				'Content-type' : 'application/json',
				'Accept' : 'application/vnd.travis-ci.2+json',
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

	accounts : function(auth, callback) {
		var options = {
			url : URI + '/accounts',
			headers : {
				'User-Agent' : 'TravisBuildStatus/1.0.0',
				'Content-type' : 'application/json',
				'Accept' : 'application/vnd.travis-ci.2+json',
				'Authorization' : auth
			},
			json: true
		};

		request.get(options, function(err, res, body) {
			if (err) {
				console.log(err);
			}
			console.log(body);
			callback(body);
		});
	},
	
	repo : function(auth, member, callback) {
		var options = {
				url : URI + '/repos/?member=' + member,
				headers : {
					'User-Agent' : 'TravisBuildStatus/1.0.0',
					'Content-type' : 'application/json',
					'Accept' : 'application/vnd.travis-ci.2+json',
					'Authorization' : auth
				},
				json: true
		};
		
		request.get(options, function(err, res, body) {
			if (err) {
				console.log(err);
			}
			console.log(body);
			callback(body);
		});
	},

}
