const express = require("express");
const { check } = require("express-validator");
const checkJwt = require("../auth").checkJwt;
const router = express.Router();

const { asyncHandler, handleValidationErrors } = require("../utils");

const db = require("../db/models");
const { User, Like, Comment, Post, Follow } = db;

router.get(
	"/:user_id/myfollowers",
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.user_id, 10);
		const user = await User.findOne({
			where: { id: userId },
			include: { model: User, as: "myFollowers" },
		});
		console.log("CHECK FOLLOWERS", user.myFollowers);
		res.json({ user });
	})
);

router.get(
	"/:user_id/myfollowings",
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.user_id, 10);
		const user = await User.findOne({
			where: { id: userId },
			include: { model: User, as: "following" },
		});
		console.log("CHECK FOLLOWERS", user.following);
		res.json({ user });
	})
);

router.delete(
	"/:user_id/myfollowings/:following",
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.user_id, 10);
		const followingId = parseInt(req.params.following, 10);
		const follow = await Follow.findOne({
			where: { following: followingId, followed: userId },
		});
		follow.destroy();
		res.json({ message: `Unfollow!` });
	})
);
module.exports = router;
