const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const fileUpload = require("express-fileupload");
const debug = require("debug")("express:server");
const bodyParser = require("body-parser");
const app = express();
const dbLayer = require("./config/db");

const rootRouter = require("./routes/root");
const usersRouter = require("./routes/users");
const numbersRouter = require("./routes/numbers");

const port = 9000;



app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));


app.use(bodyParser.json({ limit: "150mb" }));
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		limit: "150mb",
		extended: true
	})
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/"
	})
);

app.use(cookieParser());
app.use("/inc", express.static(path.join(__dirname, "inc")));

app.use((req, res, next) => {
	if (req.cookies.vcount == undefined) {
		req.vcount = 1;
		res.cookie("vcount", 1);
	} else {
		req.vcount = parseInt(req.cookies.vcount) + 1;
		res.cookie("vcount", req.vcount);
	}
	next();
});
app.use("/users", usersRouter);
app.use("/", rootRouter);

app.use("/numbers", numbersRouter);

app.listen(port, function() {
	dbLayer.init();
	debug("Sample App " + port + "!");
});
