const jwt = require("jsonwebtoken");
require("dotenv").config();

const encryptToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: "2 days" });
};

const decryptToken = (req, res, next) => {
	return jwt.verify(req.token, process.env.JWT_PASSWORD, (err, decoded) => {
		if (err)
			return res.status(400).send({
				status: "Unauthorized",
				message: "expired",
			});
		req.user = decoded;
		next();
	});
};

module.exports = { encryptToken, decryptToken };
