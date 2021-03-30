const express = require("express");
const {
	register,
	getSecurityQuestion,
	registeredChecker,
	securityQuestionChecker,
	changePasswordEmailRequest,
	changePassword,
	login,
	keepLogin,
	emailVerification,
	addAddress,
	editAddress,
	editProfile,
	editProfilePic,
	deleteAddress,
	setMainAddress,
	getCityId,
} = require("../controllers/userControllers");
const {
	registerValidator,
	decryptToken,
	changePasswordValidator,
	loginValidator,
} = require("../middlewares");

const router = express.Router();

router.get("/get-security-question", getSecurityQuestion);
router.post("/register", registerValidator, register);
router.post("/email-verification", decryptToken, emailVerification);
router.post("/login", loginValidator, login);
router.post("/keepLogin", decryptToken, keepLogin);
router.post("/registered-checker", registeredChecker);
router.post("/security-question-checker", securityQuestionChecker);
router.post("/change-password-email-request", changePasswordEmailRequest);
router.patch(
	"/change-password-with-email",
	decryptToken,
	changePasswordValidator,
	changePassword
);
router.patch(
	"/change-password-without-email",
	changePasswordValidator,
	changePassword
);
router.patch("/change-main-address", decryptToken, setMainAddress);
router.post("/add-address", addAddress);
router.patch("/edit-address", editAddress);
router.patch("/edit-profile", editProfile);
router.patch("/edit-profile-pic/:user_id", editProfilePic);
router.delete("/delete-address/:id", deleteAddress);
router.post("/get-city-id", getCityId);

module.exports = router;
