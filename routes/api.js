var express = require('express');
var router = express.Router();
var github = require('../rest/github');
var travisci = require('../rest/travisci');

router.post('/authenticate', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	github.createAuth(req.get('Authorization'), function(result) {
		console.log('result token:' + result.token);

		travisci.createAuth(result.token, function(result) {
			github.deleteAuth(result.id, req.get('Authorization'));

			res.send("{ 'accessToken': '" + result.access_token + "' }");
		});
	});
});

router.get('/repos', function(req, res) {
	var auth = req.get('Authorization');
	
	res.setHeader('Content-Type', 'application/json');
	travisci.accounts(auth, function(result) {
		var output = {
			repositories : []
		};

		result.accounts.forEach(function(currentValue) {
			console.log("member: " + currentValue.login);
			travisci.repo(auth, currentValue.login, function(result) {
				result.repos.forEach(function(currentValue, position) {
					var repository = {
						id : currentValue.id,
						name : currentValue.slug,
						description : currentValue.description,
						last_build_number : currentValue.last_build_number,
						last_build_state : currentValue.last_build_state,
						last_build_duration : currentValue.last_build_duration,
						last_build_finished_at : currentValue.last_build_finished_at
					}
					output.repositories.push(repository);
				});

				res.send(output);
			});
		});

	});

});

module.exports = router;