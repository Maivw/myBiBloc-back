const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = {
	domain: "maimai.auth0.com",
	audience: "https://bilocAPI",
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
	}),

	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithm: ["RS256"],
});

//Define an endpoint that must be called with an access token
// app.get("/api/external", checkJwt, (req, res) => {
// 	res.send({
// 		msg: "Your Access Token was successfully validated!",
// 	});
// });

module.exports = {
	authConfig,
	checkJwt,
};
