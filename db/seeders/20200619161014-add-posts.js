"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Posts", [
			{
				post_content: "Got a new outfit today!",
				location: "PA",
				user_id: 1,
				image_url:
					"https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "First day at school.",
				location: "NYC",
				user_id: 2,
				image_url:
					"https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "Who wants this balloon??? hahahahah",
				location: "NYC",
				user_id: 3,
				image_url:
					"https://images.pexels.com/photos/1391580/pexels-photo-1391580.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "This is Marry",
				location: "NYC",
				user_id: 2,
				image_url:
					"https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "Mot ngay ban ron o studio. Love it!!!",
				location: "NYC",
				user_id: 1,
				video_url:
					"https://res.cloudinary.com/maivw/video/upload/v1592512526/biLoc/production_ID_3894699_xhxbnx.mp4",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "This is Blue",
				location: "NYC",
				user_id: 1,
				image_url:
					"https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "This is Blue's brother",
				location: "NYC",
				user_id: 2,
				image_url:
					"https://images.pexels.com/photos/1078089/pexels-photo-1078089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "Welcome to Indonesia",
				location: "NYC",
				user_id: 2,
				image_url:
					"https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				post_content: "Nghe thuat nau an",
				location: "NYC",
				user_id: 2,
				image_url:
					"https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Posts", null, {});
	},
};
