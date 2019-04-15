const db = require("../config/db");

module.exports = class {
	static async getNavmenu() {
		let connection = await db.getConnection();
		const rows = await connection.query(
			"SELECT label, pageKey FROM navmenu JOIN page ON page.pageId = navmenu.pageId ORDER BY menuOrder"
		);
		connection.end();
		return rows;
	}
};
