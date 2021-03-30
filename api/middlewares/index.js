const { decryptToken, encryptToken } = require("./jwtValidator");
const registerValidator = require("./registerValidator");
const changePasswordValidator = require("./changePasswordValidator");
const loginValidator = require("./loginValidator");

module.exports = {
	decryptToken,
	encryptToken,
	registerValidator,
	changePasswordValidator,
	loginValidator,
};
