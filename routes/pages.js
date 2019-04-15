const router = require("express").Router();

const pageController = require("../controllers/page");

router.get("/", async (req, res, next) => {
	pageController.display("home", req, res, next);
});

router.get("/:page", async (req, res, next) => {
	let p = req.params.page.toLowerCase();
	pageController.display(p, req, res, next);
});
router.get("/:page/edit", async (req, res, next) => {
	let p = req.params.page.toLowerCase();
	pageController.edit(p, req, res, next);
});
router.post("/:page/edit", async (req, res, next) => {
	let p = req.params.page.toLowerCase();
	await pageController.save(p, req, res, next);
});

module.exports = router;
