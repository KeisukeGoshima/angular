const Heroes = require("./model/hero");

class FakeDB {

	constructor(){
		this.heroes = [
			{ id: 12, name: 'Dr. Nice' },
			{ id: 13, name: 'Bombasto' },
			{ id: 14, name: 'Celeritas' },
			{ id: 15, name: 'Magneta' },
			{ id: 16, name: 'RubberMan' },
			{ id: 17, name: 'Dynama' },
			{ id: 18, name: 'Dr. IQ' },
			{ id: 19, name: 'Magma' },
			{ id: 20, name: 'Tornado' }
		  ];
	}

	pushHeroesToDb() {
		this.heroes.forEach(
			(hero) => {
				const newHero = new Heroes(hero);
				newHero.save();
			}
		)
	}

	async initDb() {
		await this.cleanDb();
		this.pushHeroesToDb();
	}

	async cleanDb() {
		await Heroes.deleteMany({});
	}
}

module.exports = FakeDB;