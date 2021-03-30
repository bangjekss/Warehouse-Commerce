const { user } = require("../models");

const registerValidator = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const emailRegex = /^[\w-\.]+(@[\w-\.]+\.)+[\w-\.]{2,4}$/;
		const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;
		if (!email.match(emailRegex))
			return res
				.status(202)
				.send({ status: "Success", message: "Unvalid email" });
		if (!password.match(passwordRegex))
			return res
				.status(202)
				.send({ status: "Success", message: "Unvalid password" });
		const getUserByUsername = await user.findAll({
			where: { username, role_id: 2 },
		});
		if (getUserByUsername.length !== 0)
			return res.status(202).send({
				status: "Success",
				message: "Username already exists",
			});
		const getUserByEmail = await user.findAll({
			where: { email, role_id: 2 },
		});
		if (getUserByEmail.length !== 0)
			return res
				.status(202)
				.send({ status: "Success", message: "Email already exists" });

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = registerValidator;
