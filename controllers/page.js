const pageModel = require("../model/page");
const navmenuModel = require("../model/navmenu");

module.exports = class {
	static async pageRoute(pageName, req, res, next) {
		let page = await pageModel.getPage(pageName);
		let navmenu = await navmenuModel.getNavmenu();

		if (page[0]) {
			page = page[0];
			return res.render("root", {
				title: page.title,
				page: page,
				nav: navmenu
			});
		} else {
			next();
		}
	}
};
