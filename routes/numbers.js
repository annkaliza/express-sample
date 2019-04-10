const router = require("express").Router();

router.get("/:from-:to", (req, res) => {
	let a = parseInt(req.params.from);
	let b = parseInt(req.params.to);

	let nums = [];

	if (a > b) {
		let t = a;
		a = b;
		b = t;
	}

	for (let x = a; x <= b; x++) {
		nums.push(x);
		//html += `<div>${x}</div>`;
	}

	res.render("numbers", { title: "numbers", numbers: nums });
});

module.exports = router;
