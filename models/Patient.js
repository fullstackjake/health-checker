const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const patientSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	birthDate: {
		type: String,
		trim: true
	},
	phoneNumber: {
		type: String,
		trim: true
	},
	insured: {
		type: String,
		trim: true
	}
});

// patientSchema.pre("save", async function(next) {
// 	if (!this.isModified("name")) {
// 		next(); // skip it
// 		return; // stop this function from running
// 	}
// 	next();
// });

module.exports = mongoose.model("Patient", patientSchema);
