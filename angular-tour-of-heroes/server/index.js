const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
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
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('/api/heroes', heroesRegisterRoutes);

const PORT = process.env.PORT || '3001';

app.listen(PORT, function() {
	console.log('I am runnning');
});

// app.get('/api/heroes', (req, res) => {
// 	res.send(heroes);
// })

// app.post('/api/hero', (req, res) => {
// 	const hero = {
// 		id: heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1: 11,
// 		name: "new hero"
// 	};
// 	heroes.push(hero);
// 	res.send(hero);
// })
