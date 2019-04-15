const router = require("express").Router();

const pageController = require("../controllers/page");

router.get("/", async (req, res, next) => {
	pageController.pageRoute("home", req, res, next);
});

router.get("/:page", async (req, res, next) => {
	let p = req.params.page.toLowerCase();
	pageController.pageRoute(p, req, res, next);
});

module.exports = router;
