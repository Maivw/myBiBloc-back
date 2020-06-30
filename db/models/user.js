"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			nickname: DataTypes.STRING,
			email: DataTypes.STRING,
			picture: DataTypes.STRING,
		},
		{}
	);
	User.associate = function (models) {
		User.hasMany(models.Post, {
			foreignKey: "user_id",
			onDelete: "cascade",
			hooks: true,
		});
		User.hasMany(models.Comment, {
			foreignKey: "user_id",
			onDelete: "cascade",
			hooks: true,
		});
		User.hasMany(models.Like, {
			foreignKey: "user_id",
			onDelete: "cascade",
			hooks: true,
		});

		const columnMapping1 = {
			through: "Follows",
			foreignKey: "followed",
			otherKey: "following",
			as: "myFollowers",
		};
		const columnMapping2 = {
			through: "Follows",
			foreignKey: "following",
			otherKey: "followed",
			as: "following",
		};
		User.belongsToMany(models.User, columnMapping1);
		User.belongsToMany(models.User, columnMapping2);
	};
	return User;
};
