const express = require("express");
const router = express.Router();
// const checkJwt = require("../auth").checkJwt;
router.get("/", (req, res) => {
	res.send("index root");
});

// router.get("/api/external", checkJwt, (req, res) => {
// 	res.send({
// 		msg: "Your Access Token was successfully validated!",
// 	});
// });

module.exports = router;
