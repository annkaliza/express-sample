const db = require("../config/db");

module.exports = class {
	static async getPage(pageKey) {
		let connection = await db.getConnection();
		const rows = await connection.query(
			"SELECT * FROM page WHERE pageKey = ?",
			[pageKey]
		);
		connection.end();
		return rows;
	}

	static async savePage(pagekey, title, content) {
		let connection = await db.getConnection();
		const result = await connection.query(
			"INSERT INTO page (pagekey, title, content) values" +
				"(?,?,?) ON DUPLICATE KEY UPDATE title=?, content=?",
			[pagekey, title, content, title, content]
		);
		connection.end();
		return result;
	}
};
