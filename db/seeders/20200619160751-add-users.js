"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Users", [
			{
				nickname: "maimaimai",
				email: "maimaimai@gmail.com",
				picture:
					"https://s.gravatar.com/avatar/eaef1404662cfe1d14358604c59b6208?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nickname: "blue",
				email: "blue@gmail.com",
				picture:
					"https://s.gravatar.com/avatar/bd669279c6ea40ef0af5b9f4e4627c06?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbl.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nickname: "joejoe",
				email: "joejoe@gmail.com",
				picture:
					"https://s.gravatar.com/avatar/c27c40f7e063ebe22df6d88e111d2263?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
