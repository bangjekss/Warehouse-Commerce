const changePasswordValidator = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    const passwordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;

    if (newPassword.match(passwordRegex)) {
      return next();
    }

    const errorMessage = {
      statusCode: 401,
      message: "Pastikan password anda sesuai dengan ketentuan",
    };
    return next(errorMessage);
  } catch (err) {
    next(err);
  }
};

module.exports = changePasswordValidator;
