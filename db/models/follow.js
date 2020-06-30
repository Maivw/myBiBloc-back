"use strict";
module.exports = (sequelize, DataTypes) => {
	const Follow = sequelize.define(
		"Follow",
		{
			following: DataTypes.INTEGER,
			followed: DataTypes.INTEGER,
		},
		{}
	);
	Follow.associate = function (models) {};
	return Follow;
};
