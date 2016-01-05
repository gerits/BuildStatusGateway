var request = require('request');

const
URI = 'https://api.travis-ci.org';

var travisci = {};

travisci.createAuth = function(githubToken, callback) {
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
			callback({ 'error' : err });
		} else {
			callback(body);
		}
	});
}

travisci.accounts = function(auth, callback) {
	var options = {
		url : URI + '/accounts',
		headers : {
			'User-Agent' : 'TravisBuildStatus/1.0.0',
			'Content-type' : 'application/json',
			'Accept' : 'application/vnd.travis-ci.2+json',
			'Authorization' : auth
		},
		json : true
	};

	request.get(options, function(err, res, body) {
		console.log('err: ' + err);
		console.log('res: ' + res);
		console.log('body: ' + body);
		if (err) {
			console.log(err);
			callback({ 'error' : err });
		} else {
			callback(body);
		}
	});
}

travisci.repo = function(auth, member, callback) {
	var options = {
		url : URI + '/repos/?member=' + member,
		headers : {
			'User-Agent' : 'TravisBuildStatus/1.0.0',
			'Content-type' : 'application/json',
			'Accept' : 'application/vnd.travis-ci.2+json',
			'Authorization' : auth
		},
		json : true
	};

	request.get(options, function(err, res, body) {
		if (err) {
			console.log(err);
			callback({ 'error' : err });
		} else {
			callback(body);
		}
	});
}

module.exports = travisci;