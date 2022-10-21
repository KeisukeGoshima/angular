const express = require("express");
const mongoose = require("mongoose");
const config = require('./config/dev');
const FakeDB = require('./fake-db');

const heroesRegisterRoutes = require('./routes/heroes_register'); 

mongoose.connect(config.DB_URI).then(
	() => {
		const fakeDb = new FakeDB();
		fakeDb.initDb();
	}
);

const app = express();

app.use('/api/v1/heroes_register', heroesRegisterRoutes);

const PORT = process.env.PORT || '3001';

app.listen(PORT, function() {
	console.log('I am runnning');
});

  app.get('/api/heroes', (req, res) => {
	res.send(heroes);
  })

  app.post('/api/heroes', (req, res) => {
	const hero = {
		id: heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1: 11,
		name: "new hero"
	};
	heroes.push(hero);
	res.send(hero);
  })

  // mongodb+srv://kgoshima:<password>@cluster0.cwo3gda.mongodb.net/?retryWrites=true&w=majority