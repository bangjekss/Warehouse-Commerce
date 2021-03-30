const errorHandler = (err, req, res, next) => {
	const { statusCode, message } = err;
	return res.status(statusCode || 500).send({
		status: "ERROR",
		message: message || err[0].msg,
	});
};

module.exports = { errorHandler };
