const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const cfgControllers = require("../config/controller");
const userModel = require("../model/user");
const navmenuModel = require("../model/navmenu");
const log = require("../config/log");
module.exports = class {
	static async allUsers(req, res) {
		let users = await userModel.getUsers();

		for (let user in users) {
			if (users[user].userId != undefined) {
				users[user].hasImage = this.hasImage(users[user].userId);
			}
		}

		let data = {
			title: "User List",
			users: users,
			nav: await navmenuModel.getNavmenu()
		};

		if (cfgControllers.json) {
			return res.json(data);
		} else {
			return res.render("user/users", data);
		}
	}

	static hasImage(userId) {
		if (fs.existsSync(path.join(__dirname, `../inc/img/users/${userId}.png`))) {
			return true;
		}
		return false;
	}

	static async getUser(userId, req, res, next) {
		let user = await userModel.getUser(userId);

		if (user[0]) {
			user = user[0];
			user.hasImage = this.hasImage(userId);
			let data = {
				title: "User",
				user: user,
				nav: await navmenuModel.getNavmenu()
			};
			if (cfgControllers.json) {
				return res.json(data);
			} else {
				return res.render("user/user", data);
			}
		} else {
			next();
		}
	}
	// stores and resizes an image for the user
	static async editUserForm(userId, req, res, next) {
		let user = await userModel.getUser(userId);

		if (user[0]) {
			user = user[0];
			user.hasImage = this.hasImage(userId);
			let data = {
				title: "User",
				user: user,
				nav: await navmenuModel.getNavmenu()
			};
			if (cfgControllers.json) {
				return res.json(data);
			} else {
				return res.render("user/editprofile", data);
			}
		} else {
			next();
		}
	}
	static async saveUserForm(userId, req) {
		let img = req.files.image;
		let tFilePath = path.join(__dirname, `../tmp/${userId}`);
		await img.mv(tFilePath);
		try {
			await sharp(tFilePath)
				.resize(250, 200, {
					kernel: sharp.kernel.cubic,
					fit: "cover",
					position: "attention",
					background: { r: 255, g: 255, b: 255, alpha: 0.1 }
				})
				.png()
				.toFile(path.join(__dirname, `../inc/img/users/${userId}.png`));
		} catch (err) {
			log(req, err);
		}
		fs.unlink(tFilePath, () => {});
	}
};
