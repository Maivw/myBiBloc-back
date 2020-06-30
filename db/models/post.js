"use strict";
module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		"Post",
		{
			post_content: DataTypes.STRING,
			location: DataTypes.STRING,
			user_id: DataTypes.INTEGER,
			image_url: DataTypes.STRING,
			video_url: DataTypes.STRING,
		},
		{}
	);
	Post.associate = function (models) {
		Post.belongsTo(models.User, {
			foreignKey: "user_id",
		});
		Post.hasMany(models.Comment, {
			foreignKey: "post_id",
			onDelete: "cascade",
			hooks: true,
		});
		Post.hasMany(models.Like, {
			foreignKey: "post_id",
			onDelete: "cascade",
			hooks: true,
		});
	};
	return Post;
};
