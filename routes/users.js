const router = require("express").Router();

//router.use('/settings', userSettingRouter);
router.get("/:userId/:email", (req, res) => {
	let uid = parseInt(req.params.userId);
	let email = req.params.email;

	res.send(`user ${uid}'s email set to ${email}`);
});

module.exports = router;
