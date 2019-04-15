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
};
