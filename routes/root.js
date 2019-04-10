const router = require("express").Router();
const path = require("path");
const db = require("../config/db").pool;

// async function getUsers() {
// 	let connection = await db.getConnection();
// 	const rows = await connection.query("SELECT * FROM user");
// 	connection.end();
// 	return rows;
// }

async function getPage(pageKey) {
	let connection = await db.getConnection();
	const rows = await connection.query("SELECT * FROM page WHERE pageKey = ?", [
		pageKey
	]);
	connection.end();
	return rows;
}

router.get("/", async (req, res) => {
	let page = await getPage("home");
	page = page[0];
	return res.render("root", { title: page.title, page: page });
});

router.get("/:page", async (req, res, next) => {
	let p = req.params.page.toLowerCase();
	let page = await getPage(p);

	if (page[0]) {
		page = page[0];
		return res.render("root", { title: page.title, page: page });
	} else {
		next();
	}
});

router.get("/inc", (req, res) => {
	return res.send(path.join(__dirname, "inc"));
});

router.get("/hello", (req, res) => {
	return res.send(req.vcount + "<br>hey there");
});

module.exports = router;
