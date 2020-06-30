"use strict";
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			comment_content: DataTypes.STRING,
			post_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
		},
		{}
	);
	Comment.associate = function (models) {
		Comment.belongsTo(models.Post, {
			foreignKey: "post_id",
			onDelete: "cascade",
		});
		Comment.belongsTo(models.User, {
			foreignKey: "user_id",
			onDelete: "cascade",
		});
		Comment.hasMany(models.Like, {
			foreignKey: "comment_id",
			onDelete: "cascade",
			hooks: true,
		});
	};

	return Comment;
};
