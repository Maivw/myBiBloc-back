const express = require("express");
const { asyncHandler, handleValidationErrors } = require("../utils");
const checkJwt = require("../auth").checkJwt;
const { check } = require("express-validator");

const db = require("../db/models");
const { User, Post } = db;
const router = express.Router();

const validateLoginInfo = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

router.patch(
	"/",
	checkJwt,
	asyncHandler(async (req, res) => {
		const { email, nickname, picture } = req.body;
		let user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			user = await User.create({ email, nickname, picture });
			res.status(201).json({
				user: {
					id: user.id,
					nickname: user.nickname,
					email: user.email,
					picture: user.picture,
				},
			});
		} else {
			res.status(201).json({
				user: {
					id: user.id,
					nickname: user.nickname,
					email: user.email,
					picture: user.picture,
				},
			});
		}
	})
);

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.id, 10);
		const user = await User.findByPk(userId);
		res.json({ user });
	})
);
router.get(
	"/:id/posts",
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.id, 10);
		const posts = await User.findAll({
			where: { id: userId },
			order: [["createdAt", "DESC"]],
			include: [Post],
		});
		res.json({ posts });
	})
);

module.exports = router;
