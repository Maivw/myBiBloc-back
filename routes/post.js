const express = require("express");
const { check } = require("express-validator");
const checkJwt = require("../auth").checkJwt;
const _ = require("lodash");

const { asyncHandler, handleValidationErrors } = require("../utils");
const upload = require("../upload");

const db = require("../db/models");
const { User, Like, Comment, Post } = db;

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const posts = await Post.findAll({
			order: [["createdAt", "DESC"]],
			include: [Comment, Like, User],
		});
		res.json({ posts });
	})
);

const postNotFoundError = (id) => {
	const err = Error("Post not found");
	err.errors = [`Post with id of ${id} could not be found.`];
	err.title = "Post not found.";
	err.status = 404;
	return err;
};

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const postId = parseInt(req.params.id, 10);
		const post = await Post.findByPk(postId, {
			include: [Like, Comment, User],
		});
		if (post) {
			res.json({ post });
		} else {
			next(postNotFoundError(postId));
		}
	})
);

router.post(
	"/",
	upload.single("image_url"),
	asyncHandler(async (req, res, next) => {
		const { post_content, location, user_id, video_url, image_url } = req.body;
		const isFile = _.get(req, "file.path", ""); // {res: {file {path : 'upload/file_name.png'}}}
		const formatUrlFile = isFile
			? `http://localhost:8080/${isFile}`
			: image_url;
		console.log("IMAGRe", image_url);
		console.log("ISFILE", isFile);
		let post = await Post.create({
			post_content,
			location,
			user_id,
			image_url: formatUrlFile,
			video_url,
		});
		post = await Post.findOne({
			where: {
				id: post.id,
			},
			include: [Like, Comment, User],
		});
		// post.setDataValue("User", await post.getUser());
		res.status(201).json({ post });
	})
);

router.put(
	"/:id",
	asyncHandler(async (req, res, next) => {
		const { post_content, location, user_id, image_url, video_url } = req.body;
		const post = await Post.findOne({
			where: {
				id: req.params.id,
			},
			include: [Like, Comment, User],
		});

		if (post) {
			await post.update({
				post_content,
				location,
				user_id,
				image_url,
				video_url,
			});
			res.status(201).json({ post });
		} else {
			next(postNotFoundError(req.params.id));
		}
	})
);

router.delete(
	"/:id",
	checkJwt,
	asyncHandler(async (req, res, next) => {
		const post = await Post.findOne({
			where: {
				id: req.params.id,
			},
			include: [Like, Comment],
		});
		if (post) {
			await post.destroy();
			res.json({ post_id: req.params.id });
		} else {
			next(postNotFoundError(req.params.id));
		}
	})
);
module.exports = router;
