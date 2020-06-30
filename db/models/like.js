"use strict";
module.exports = (sequelize, DataTypes) => {
	const Like = sequelize.define(
		"Like",
		{
			comment_id: DataTypes.INTEGER,
			post_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
		},
		{}
	);
	Like.associate = function (models) {
		Like.belongsTo(models.User, {
			foreignKey: "user_id",
			onDelete: "cascade",
		});
		Like.belongsTo(models.Post, {
			foreignKey: "post_id",
		});
		Like.belongsTo(models.Comment, {
			foreignKey: "comment_id",
		});
	};
	return Like;
};
