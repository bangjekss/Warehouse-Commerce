const errorHandler = (err, req, res, next) => {
	const { statusCode, message, status } = err;
	// return res.status(statusCode || 500).send(err);
	return res.status(statusCode || 500).send({
		status: status || "ERROR",
		message: message || err,
	});
};

module.exports = { errorHandler };
