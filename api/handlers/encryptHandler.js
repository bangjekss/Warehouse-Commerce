const crypto = require("crypto");
require("dotenv").config();

const encryptHandler = (payload) =>
	crypto
		.createHmac("sha256", process.env.ENCRYPT_PASSWORD)
		.update(payload)
		.digest("hex");

module.exports = { encryptHandler };
