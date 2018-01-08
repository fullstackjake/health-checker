var request = require("request");

exports.demo = (req, res) => {
	res.render("index", { title: "Express" });
};

exports.results = (req, res) => {
	// Request with good ol' CURL

	// Setting up request to the server
	var options = {
		method: "POST",
		// TEAM Not checking certificates means that you cannot be certain of the identity of the other party and so might be subject to a spoofed host.
		rejectUnauthorized: false, // THIS IS DANGEROUS IN PRODUCTION
		url: "https://apistage.gohealthuc.com:1981/v1/eligibility_demo",
		headers: {
			"Content-Type": "application/json",
			authtoken: "ghJoseph@445"
		},
		body: {
			member: {
				first_name: "Marsha",
				last_name: "Mellow",
				id: "W213967732",
				birth_date: "1980-01-20"
			},
			provider: { first_name: "Marty", last_name: "Seeger", npi: "1234567890" },
			trading_partner_id: "aetna"
		},
		json: true
	};

	// Curl request to the server with custom options
	request(options, function(error, response, body) {
		if (error) throw new Error(error);

		// Pull data and massage for use with our App
		const patientData = JSON.stringify(body);
		const patient = JSON.parse(patientData);
		console.log(patient["data"]["coverage"]["eligibility_begin_date"]);
	});

	res.render("patientResults", {
		title: "Look Me Up",
		results: "Results are in",
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		memberId: req.body.memberId,
		birthDate: req.body.birthDate
	});
};
