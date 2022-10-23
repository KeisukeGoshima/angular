const express = require('express');
const Heroes = require('../model/hero');
const router  = express.Router();


router.get('', function(req, res) {
	Heroes.find({}, function(err, foundHeroes){
		res.json(foundHeroes);
	}).sort({"id": 1});
});

router.post('', function(req, res) {
	Heroes.find({}, function(err , foundHeroes){
		const name = req.body.name;
		const id = foundHeroes[0].id + 1;
		console.log(name);
		if (!name || !id) errors.push({ msg: "not correct"});
		else
		{
			Heroes.findOne({ name: name}).then(hero => {
				if (hero) {
					console.log("Error not register new hero");
				}
				else
				{
					const newHero = new Heroes({
						id,
						name
					});
					newHero.save();
				}
			})
		}
		res.send("success");
	}).sort({"id": -1});
});

router.put('', function(req, res) {
	const heroId = req.body.id;
	const heroNewName = req.body.name;
	Heroes.updateOne(
		{ "id": heroId},
		{ $set: { "name": heroNewName}},
		function(err) {
			if (err) throw err;
		}
	)
	res.send(heroNewName);
})

router.get('/:id', function(req, res) {
	const heroId = req.params.id;
	Heroes.find({ id: heroId}, function(err, foundHeroes) {
		if (err) {
			res.status(422).send({errors: [{title: 'hero error', detail: 'Hero not found'}]});
			return ;
		}
		res.json(foundHeroes[0]);
	});
});

router.delete('/:id', function(req, res) {
	const heroId = req.params.id;
	Heroes.findOneAndDelete({"id": heroId}, function(err, deleteHero){
		console.log(deleteHero);
	});
	res.send("delete");
})

router.get('/find/:name', function(req, res) {
	const heroName = req.params.name;
	console.log(heroName);
	Heroes.find({"name": {$regex: heroName, $options: "i"}}, function(err, findHero) {
		res.json(findHero);
	})
})



module.exports = router;