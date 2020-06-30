const express = require("express");
const checkJwt = require("../auth").checkJwt;

const { asyncHandler } = require("../utils");

const db = require("../db/models");
const { User, Comment, Post, Like } = db;

const router = express.Router();
const commentNotFoundError = (id) => {
	const err = Error("Comment not found");
	err.errors = [`Comment with id of ${id} could not be found.`];
	err.title = "Comment not found.";
	err.status = 404;
	return err;
};

router.get(
	"/:post_id",
	asyncHandler(async (req, res, next) => {
		const { comment_content, user_id, post_id } = req.body;
		const comments = await Comment.findAll({
			where: {
				post_id: req.params.post_id,
			},
			include: [User, Post, Like],
		});

		if (comments) {
			res.json({ comments });
		} else {
			next(commentNotFoundError(req.params.id));
		}
	})
);
router.post(
	"/:post_id/",
	asyncHandler(async (req, res, next) => {
		const { comment_content, post_id, user_id } = req.body;
		let comment = await Comment.create({
			comment_content,
			post_id,
			user_id,
		});
		comment = await Comment.findOne({
			where: {
				id: comment.id,
			},
			include: [Like, Post, User],
		});

		res.status(201).json({ comment });
	})
);

router.get(
	"/:post_id/:id",
	asyncHandler(async (req, res, next) => {
		const { id, user_id, post_id } = req.body;
		const comment = await Comment.findOne({
			where: {
				id: req.params.id,
			},
			include: [User, Post, Like],
		});

		if (comment) {
			res.json({ comment });
		} else {
			next(commentNotFoundError(req.params.id));
		}
	})
);

router.put(
	"/:post_id/:id",
	asyncHandler(async (req, res, next) => {
		const { comment_content, user_id, post_id, id } = req.body;
		const comment = await Comment.findOne({
			where: {
				id: req.params.id,
			},
			include: [User, Post, Like],
		});

		if (comment) {
			await comment.update({
				comment_content,
				user_id,
				post_id,
				id: id,
			});
			res.json({ comment });
		} else {
			next(commentNotFoundError(req.params.id));
		}
	})
);

router.delete(
	"/:post_id/:id",
	asyncHandler(async (req, res, next) => {
		const { post_id, id } = req.body;
		const comment = await Comment.findOne({
			where: {
				id: req.params.id,
			},
			include: [User, Post, Like],
		});
		if (comment) {
			await comment.destroy();
			res.json({
				message: `Deleted comment with id of ${req.params.id}.`,
				post_id,
				id,
			});
		} else {
			next(commentNotFoundError(req.params.id));
		}
	})
);

module.exports = router;
