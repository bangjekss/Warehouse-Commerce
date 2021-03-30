const Crypto = require("crypto");
const hash = (password) => {
	return Crypto.createHmac("sha256", "naturegoodsmantap")
		.update(password)
		.digest("hex");
};

module.exports = hash;
