const pageModel = require("../model/page");
const navmenuModel = require("../model/navmenu");

module.exports = class {
	static async getPage(pagekey) {
		let page = await pageModel.getPage(pagekey);
		let navmenu = await navmenuModel.getNavmenu();
		if (page[0]) {
			return { title: page[0].title, page: page[0], nav: navmenu };
		}
		return false;
	}

	static async display(pageName, req, res, next) {
		//pagedata = pd
		let pd = await this.getPage(pageName);
		if (pd) {
			return res.render("page/display", {
				title: pd.title,
				page: pd.page,
				nav: pd.nav
			});
		} else {
			next();
		}
	}
	static async edit(pageName, req, res, next) {
		//pagedata = pd
		let pd = await this.getPage(pageName);
		if (pd) {
			return res.render("page/edit", {
				title: pd.title,
				page: pd.page,
				nav: pd.nav
			});
		} else {
			next();
		}
	}

	//save method
	static async save(pagekey, req, res, next) {
		const title = req.body.title;
		const content = req.body.content;

		await pageModel.savePage(pagekey, title, content);

		await this.edit(pagekey, req, res, next);
	}
};
