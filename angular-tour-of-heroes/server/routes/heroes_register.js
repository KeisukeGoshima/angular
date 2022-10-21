const express = require('express');
const Heroes = require('../model/hero');
const router  = express.Router();


router.get('', function(req, res) {
	Heroes.find({}, function(err, foundHeroes) {
		res.json(foundHeroes);
	});
});

router.get('/:id', function(req, res) {
	const heroId = req.params.id;
	Heroes.findById(heroId, function(err, foundHeroes) {
		if (err) {
			res.status(422).send({errors: [{title: 'hero error', detail: 'Hero not found'}]});
			return ;
		}
		res.json(foundHeroes);
	});
});

module.exports = router;