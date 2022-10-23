const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true},
});

module.exports = mongoose.model("Heroes", HeroSchema);
