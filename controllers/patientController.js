const mongoose = require("mongoose");
const Patient = mongoose.model("Patient");
const promisify = require("es6-promisify");
const request = require("request");

exports.insurance = (req, res) => {
	var patient = new Patient({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		lastName: req.body.lastName,
		phoneNumber: req.body.phoneNumber,
		birthDate: req.body.birthDate,
		ins: req.body.ins
	});

	patient.save(function(error) {
		console.log("Your Patient has been saved!");
		if (error) {
			console.error(error);
		}
	});

	if (req.body.ins == "No") {
		res.redirect("https://www.gohealthuc.com/about");
	} else {
		res.render("patientResults", {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phoneNumber: req.body.phoneNumber,
			birthDate: req.body.birthDate,
			ins: req.body.ins
		});
	}
};

exports.lookup = (req, res) => {
	res.redirect("/");
};
