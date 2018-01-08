var request = require("request");
let patient = "";
exports.magic = (req, res) => {
	// Request with good ol' CURL

	// Setting up request to the server

	// Set default values of information to send

	const authUser = "ghJoseph@445";
	const member = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		memberId: req.body.insCarrierId,
		birthDate: req.body.birthDate,
		phoneNumber: req.body.phoneNumber
	};

	// var testFirstName = "Marsha";

	var options = {
		method: "POST",
		// TEAM Not checking certificates means that you cannot be certain of the identity of the other party and so might be subject to a spoofed host.
		rejectUnauthorized: false, // THIS IS DANGEROUS IN PRODUCTION
		url: "https://apistage.gohealthuc.com:1981/v1/eligibility_demo",
		headers: {
			"Content-Type": "application/json",
			authtoken: authUser
		},
		body: {
			member: {
				first_name: member.firstName,
				last_name: member.lastName,
				id: member.memberId,
				birth_date: member.birthDate
			},
			provider: { first_name: "Marty", last_name: "Seeger", npi: "1234567890" },
			trading_partner_id: "aetna"
		},
		json: true
	};

	// Curl request to the server with custom options
	request(options, function(error, response, body) {
		if (error) {
			throw new Error(error);
		}

		// Pull data and massage for use with our App
		const patientData = JSON.stringify(body);
		patient = JSON.parse(patientData);
		console.log(JSON.stringify(patient));

		// Plan status and Copay estimate
		const coverageStatus = patient["data"]["coverage"]["active"],
			copay = patient["data"]["coverage"]["copay"][0]["copayment"]["amount"],
			copayLevel = patient["data"]["coverage"]["copay"][0]["coverage_level"],
			inNetwork = patient["data"]["coverage"]["copay"][0]["coverage_level"],
			coverageDate = patient["data"]["coverage"]["eligibility_begin_date"];

		res.render("estimate", {
			firstName: member.firstName,
			lastName: member.lastName,
			phoneNumber: member.phoneNumber,
			memberId: req.body.insCarrierId,
			birthDate: member.birthDate,
			coverageStatus: coverageStatus,
			coverageDate: coverageDate,
			copay: copay,
			copayLevel: copayLevel
		});
	});

	// res.render("estimate", {
	// 	title: "Look Me Up",
	// 	results: "Results are in",
	// 	firstName: req.body.firstName,
	// 	lastName: req.body.lastName,
	// 	memberId: req.body.memberId,
	// 	birthDate: req.body.birthDate
	// });

	// res.render("estimate", {
	// 	coverageDate: patient["data"]
	// });
	// res.redirect("https://www.gohealthuc.com/about");
};
