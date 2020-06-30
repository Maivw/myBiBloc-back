"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Follows", [
			{
				followed: 1,
				following: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				followed: 2,
				following: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				followed: 1,
				following: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				followed: 3,
				following: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Follows", null, {});
	},
};
