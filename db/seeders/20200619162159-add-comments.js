"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Comments", [
			{
				comment_content: "you are amazing!",
				post_id: 1,
				user_id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				comment_content: "Gorgeous!!! Missed you!",
				post_id: 1,
				user_id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				comment_content: "love it, love it, love it! ",
				post_id: 1,
				user_id: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Comments", null, {});
	},
};
