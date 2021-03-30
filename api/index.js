const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./handlers");
const {
	userRouters,
	productRouters,
	adminRouters,
	cartRouters,
	transactionRouters,
} = require("./routers");
const bearerToken = require("express-bearer-token");

const app = express();

app.use(bearerToken());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.status(200).send("nature goods api"));
app.use("/user", userRouters);
app.use("/product", productRouters);
app.use("/cart", cartRouters);
app.use("/transaction", transactionRouters);
app.use("/admin", adminRouters);

app.use(errorHandler);
const API_PORT = process.env.API_PORT;
require("dotenv").config();

app.listen(API_PORT, () => console.log(`running on ${API_PORT}`));
