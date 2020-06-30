const express = require("express");
const { check } = require("express-validator");
const checkJwt = require("../auth").checkJwt;
const { Op } = require("sequelize");

const { asyncHandler, handleValidationErrors } = require("../utils");

const db = require("../db/models");
const { User, Like, Comment, Post } = db;

const router = express.Router();
const postNotFoundError = (id) => {
	const err = Error("Comment not found");
	err.errors = [`Comment with id of ${id} could not be found.`];
	err.title = "Comment not found.";
	err.status = 404;
	return err;
};
//get all likes of a post
router.get(
	"/:post_id",
	asyncHandler(async (req, res, next) => {
		// const { user_id, post_id, comment_id } = req.body;
		const { post_id } = req.body;
		const likes = await Like.findAll({
			// user_id,
			post_id,
			// comment_id,
		});

		res.status(201).json({ likes });
	})
);
//get all likes of a comment
router.get(
	"/:post_id/(:comment_id)?",
	asyncHandler(async (req, res, next) => {
		const { user_id, post_id, comment_id } = req.body;
		const likes = await Like.findAll({
			user_id,
			post_id,
			comment_id,
		});

		res.status(201).json({ likes });
	})
);

// give a like to a post or a comment
router.post(
	"/:post_id/(:comment_id)?",
	asyncHandler(async (req, res, next) => {
		const { user_id, post_id, comment_id } = req.body;
		const like = await Like.create({
			user_id,
			post_id,
			comment_id,
		});

		res.status(201).json({ like });
	})
);
router.post(
	"/:post_id",
	asyncHandler(async (req, res, next) => {
		// const { user_id, post_id } = req.body;
		// // b1: kiem tra postid va user id da dc luu trong db : get where : [] .length < 0
		// // chua
		// const like = await Like.create({
		// 	user_id,
		// 	post_id,
		// });
		// // roi: > 0

		const { user_id, post_id } = req.body;
		const like = await Like.findOne({
			where: {
				user_id,
				post_id,
			},
		});
		if (like) {
			await like.destroy();
			res.status(201).json({ post_id, message: "unlike successfully" });
		} else {
			const like = await Like.create({
				user_id,
				post_id,
			});
			res.status(201).json({ like });
		}
	})
);

//unlike
router.delete(
	"/:post_id/(:comment_id)?",
	asyncHandler(async (req, res, next) => {
		const { user_id, post_id, comment_id } = req.body;
		const like = await Like.findOne({
			where: {
				user_id,
				[Op.or]: [{ post_id }, { comment_id }],
			},
		});
		if (like) {
			await like.destroy();
			res.json({
				message: `Deleted like with id of ${comment_id} on ${post_id}.`,
			});
		} else {
			next(postNotFoundError(post_id));
		}
	})
);

router.delete(
	"/:post_id",
	asyncHandler(async (req, res, next) => {
		const { user_id, post_id } = req.body;
		const like = await Like.findOne({
			where: {
				user_id,
				post_id,
			},
		});
		if (like) {
			await like.destroy();
			res.json({
				message: `Deleted like the post with ${post_id}.`,
			});
		} else {
			next(postNotFoundError(post_id));
		}
	})
);

module.exports = router;
