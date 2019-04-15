const router = require("express").Router();
const { check } = require("express-validator/check");

const pageController = require("../controllers/page");

const validate = [
	check("title", "Title required").isLength({ min: 1 }),
	check("title", "Title too short").isLength({ min: 2 }),
	check("content", "Content should not be empty").isLength({ min: 1 })
];

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
router.post("/:page/edit", [validate], async (req, res, next) => {
	let p = req.params.page.toLowerCase();
	await pageController.save(p, req, res, next);
});

module.exports = router;
