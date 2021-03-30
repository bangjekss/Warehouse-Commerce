const loginValidator = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const emailRegex = /^[\w-\.]+(@[\w-\.]+\.)+[\w-\.]{2,4}$/;
		const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;
		// console.log(email, password);
		if (!email.match(emailRegex))
			return res
				.status(202)
				.send({ status: "Success", message: "Unvalid email" });
		if (!password.match(passwordRegex))
			return res
				.status(202)
				.send({ status: "Success", message: "Unvalid password" });
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = loginValidator;
