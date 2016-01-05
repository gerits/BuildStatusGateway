var async = require('async');

var travisci = require('../rest/travisci');

var repos = {};

repos.execute = function(authorization, callback) {
	travisci.accounts(authorization, function(result) {
		var output = {
			repositories : []
		};
		
		if (result.error != undefined) {
			callback(result);
		} else {
			async.each(result.accounts, function(item, callback) {
				processAccount(authorization, output, item, callback);
			}, function done(err) {
				if (err) {
					console.log('failed to process request: ' + err);
					callback({ error : err });
				} else {
					callback(output);
				}
			});
		}
	});
}

function processAccount(authorization, output, item, callback) {
	travisci.repo(authorization, item.login, function(result) {
		async.each(result.repos, function(item, callback) {
			var repository = {
				id : item.id,
				name : item.slug,
				description : item.description,
				last_build_number : item.last_build_number,
				last_build_state : item.last_build_state,
				last_build_duration : item.last_build_duration,
				last_build_finished_at : item.last_build_finished_at
			}
			output.repositories.push(repository);
			callback();
		}, function() {
			callback();
		});
	});
}

module.exports = repos;