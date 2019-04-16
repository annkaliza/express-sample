const pageModel = require("../model/page");
const navmenuModel = require("../model/navmenu");
const { validationResult } = require("express-validator/check");

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

	static async new(req, res) {
		const errors = this.reError(req);
		return res.render("page/edit", { page: {}, errors: errors });
	}

	static reError(req) {
		const errors = {};
		if (req.validationErrors) {
			for (let err in req.validationErrors) {
				let e = req.validationErrors[err];
				errors[e.param] = errors[e.param] ? errors[e.param] : [];
				errors[e.param].push(e.msg);
			}
		}
		return errors;
	}

	static async edit(pageName, req, res, next) {
		let pd = await this.getPage(pageName);

		const errors = this.reError(req);
		if (pd) {
			return res.render("page/edit", {
				title: pd.title,
				page: pd.page,
				nav: pd.nav,
				errors: errors
			});
		} else {
			next();
		}
	}

	//save method
	static async save(pagekey, req, res, next) {
		const errors = validationResult(req);
		// console.log(errors.array());
		if (!errors.isEmpty()) {
			req.validationErrors = errors.array();
		} else {
			const title = req.body.title;
			const content = req.body.content;
			pagekey = req.body.pagekey;

			await pageModel.savePage(pagekey, title, content);
		}

		if (pagekey) {
			await this.edit(pagekey, req, res, next);
		} else {
			await this.new(req, res);
		}
	}
};
