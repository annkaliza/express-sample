const router = require("express").Router();
const userController = require("../controllers/user");

router.get("/", (req, res) => {
	userController.allUsers(req, res);
});

router.get("/:userId", (req, res, next) => {
	let uid = parseInt(req.params.userId);
	userController.getUser(uid, req, res, next);
});

router.get("/:userId/edit", (req, res, next) => {
	let uid = parseInt(req.params.userId);
	userController.editUserForm(uid, req, res, next);
});

router.post("/:userId/edit", async (req, res, next) => {
	let uid = parseInt(req.params.userId);
	await userController.saveUserForm(uid, req, res);
	userController.editUserForm(uid, req, res, next);
});

module.exports = router;
