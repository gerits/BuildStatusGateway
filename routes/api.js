var express = require('express');
var router = express.Router();

var authenticate = require('../actions/authenticate');
var repos = require('../actions/repos');

router.post('/authenticate', function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	authenticate.execute(req.get('Authorization'), function(result) {
		res.json(result);
	});
});

router.get('/repos', function(req, res) {
	var authorization = req.get('Authorization');

	res.setHeader('Content-Type', 'application/json');

	repos.execute(req.get('Authorization'), function(result) {
		res.json(result);
	});
});

module.exports = router;