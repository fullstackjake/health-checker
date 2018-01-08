var request = require("request");

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

request(options, function(error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

// console.log(util.inspect(theResponse, false, null));
