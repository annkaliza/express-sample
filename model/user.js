const db = require("../config/db");

module.exports = class {
	static async getUsers() {
		let connection = await db.getConnection();
		const rows = await connection.query("SELECT userId, username FROM user");
		connection.end();
		return rows;
	}
	static async getUser(userId) {
		let connection = await db.getConnection();
		const rows = await connection.query(
			"SELECT userId, username FROM user WHERE userId = ?",
			[userId]
		);
		connection.end();
		return rows;
	}
};
