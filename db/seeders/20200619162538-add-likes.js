"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Likes", [
			{
				post_id: 1,
				user_id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				comment_id: 2,
				post_id: 1,
				user_id: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				comment_id: 2,
				post_id: 1,
				user_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Likes", null, {});
	},
};
