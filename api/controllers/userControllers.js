const { user, securityQuestion, userAddress } = require("../models");
const { encryptToken } = require("../middlewares");
const { encryptHandler, emailHandler } = require("../handlers");

const { uploader } = require("../handlers");
const pify = require("pify");
const fs = require("fs");
const rp = require("request-promise");

const register = async (req, res, next) => {
  try {
    const verify = encryptToken(req.body);
    const mailOption = {
      from: "Admin <nature.goods.official@no-reply.com>",
      to: req.body.email,
      subject: "Email Verification",
      template: "VerifyEmail",
      context: {
        username: req.body.username,
        email: req.body.email,
        verify,
      },
    };
    await emailHandler(mailOption);
    return res
      .status(200)
      .send({ status: "SUCCESS", message: "Please check your email" });
  } catch (err) {
    next(err);
  }
};

const emailVerification = async (req, res, next) => {
  try {
    const {
      username,
      password,
      email,
      full_name,
      security_answer,
      security_question_id,
    } = req.user;
    const addUser = await user.create({
      username,
      password: encryptHandler(password),
      email,
      full_name,
      security_answer,
      security_question_id,
    });
    const getUser = await user.findOne({
      where: {
        id: addUser.id,
      },
      attributes: { exclude: "password" },
    });
    const response = {
      ...getUser.dataValues,
      token: encryptToken(getUser.dataValues),
    };
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const getSecurityQuestion = async (req, res, next) => {
  try {
    const getQuestion = await securityQuestion.findAll();
    const response = [];
    getQuestion.forEach((value) => {
      response.push({ value: value.id, label: value.question });
    });
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const getUser = await user.findAll({
      where: {
        email: req.body.email,
        password: encryptHandler(req.body.password),
      },
      attributes: { exclude: "password" },
      include: [
        {
          model: userAddress,
          as: "user_address",
        },
        {
          model: securityQuestion,
        },
      ],
      order: [[{ model: userAddress, as: "user_address" }, "is_main", "ASC"]],
    });
    if (getUser.length === 0) {
      return res.status(404).send({
        message: "User Not Found",
        status: "Not Found",
      });
    }
    const response = {
      ...getUser[0].dataValues,
      token: encryptToken(getUser[0].dataValues),
    };
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const keepLogin = async (req, res, next) => {
  try {
    const id = req.user.id;
    const getUser = await user.findOne({
      where: {
        id,
      },
      include: [
        {
          model: userAddress,
          as: "user_address",
        },
        {
          model: securityQuestion,
        },
      ],
    });
    return res.status(200).send(getUser);
  } catch (err) {
    next(err);
  }
};

const registeredChecker = async (req, res, next) => {
  const { email } = req.body;

  try {
    const getData = await user.findOne({
      where: {
        email: email,
        email_verification_id: 1,
      },
      include: {
        model: securityQuestion,
      },
      raw: true,
    });

    if (!getData) {
      res.status(404).send({
        message:
          "Mohon maaf, email anda tidak tersedia atau belum terverifikasi",
      });
    }

    return res.status(200).send(getData);
  } catch (err) {
    next(err);
  }
};

const securityQuestionChecker = async (req, res, next) => {
  const { email, answer } = req.body;

  try {
    const getData = await user.findOne({
      where: {
        email: email,
        email_verification_id: 1,
        security_answer: answer,
      },
    });

    if (!getData) {
      res.status(404).send({
        message: "Mohon maaf, jawaban anda salah",
      });
    }

    return res.status(200).send(true);
  } catch (err) {
    next(err);
  }
};

const changePasswordEmailRequest = async (req, res, next) => {
  const { email } = req.body;
  try {
    const getData = await user.findOne({
      where: {
        email,
        email_verification_id: 1,
      },
      attributes: ["email"],
    });

    const token = encryptToken({
      ...getData.toJSON(),
    });

    const mailOptions = {
      from: "Admin <luthfilarlar@gmail.com>",
      to: email,
      subject: "Permintaan Ubah Password",
      html: `
        <div>
          <p>Nature Goods</p>
          <p>Permohonan Pengubahan Password</p>
          <a href="http://localhost:3000/redirect?email=${email}&token=${token}">Klik disini untuk mengganti password</a>
          <p>Tidak merasa mengirim permohonan? Abaikan saja!</p>
        </div>`,
    };

    await emailHandler(mailOptions);

    return res.status(200).send({
      message: "Sent",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  const { newPassword, id } = req.body;

  try {
    if (req.user) {
      await user.update(
        {
          password: encryptHandler(newPassword),
        },
        {
          where: {
            email: req.user.email,
          },
        }
      );
    } else {
      await user.update(
        {
          password: encryptHandler(newPassword),
        },
        {
          where: {
            id,
          },
        }
      );
    }

    return res.status(200).send({
      message: "Edited",
    });
  } catch (err) {
    next(err);
  }
};

const setMainAddress = async (req, res, next) => {
  try {
    if (req.body.mainBeforeId) {
      await userAddress.update(
        {
          is_main: 2,
        },
        {
          where: {
            user_id: req.user.id,
            id: req.body.mainBeforeId,
          },
        }
      );
    }
    await userAddress.update(
      {
        is_main: 1,
      },
      {
        where: {
          user_id: req.user.id,
          id: req.body.mainAfterId,
        },
      }
    );
    const getUser = await user.findAll({
      where: {
        id: req.user.id,
      },
      attributes: { exclude: "password" },
      include: {
        model: userAddress,
        as: "user_address",
      },
      order: [[{ model: userAddress, as: "user_address" }, "is_main", "ASC"]],
    });
    const response = {
      ...getUser[0].dataValues,
      token: encryptToken(getUser[0].dataValues),
    };
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const getCityId = async (req, res, next) => {
  const { fullCityName } = req.body;

  var options = {
    method: "GET",
    url: "https://api.rajaongkir.com/starter/city",
    qs: {},
    headers: { key: "297f2e600ca59ca3dbe967382288fb42" },
  };

  try {
    const response = await rp(options);

    const parsedRes = JSON.parse(response);
    const cityData = parsedRes.rajaongkir.results;

    const split = fullCityName.split(" ");

    split.splice(0, 1);

    const cityName = split.join(" ");

    const find = cityData.find((val) => {
      return val.city_name === cityName;
    });

    res.status(200).send(find.city_id);
  } catch (err) {
    next(err);
  }
};

const addAddress = async (req, res, next) => {
  const {
    label,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    alamatLengkap,
    kodePos,
    userId,
    lat,
    lng,
    phone,
    cityId,
  } = req.body;

  try {
    await userAddress.create({
      label,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      alamat_lengkap: alamatLengkap,
      kode_pos: kodePos,
      user_id: userId,
      long: lng,
      lat: lat,
      phone,
      city_id: cityId,
    });

    res.status(200).send({
      message: "Added",
    });
  } catch (err) {
    next(err);
  }
};

const editAddress = async (req, res, next) => {
  const {
    id,
    label,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    alamatLengkap,
    kodePos,
    userId,
    lat,
    lng,
    phone,
    cityId,
  } = req.body;

  try {
    await userAddress.update(
      {
        label,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        alamat_lengkap: alamatLengkap,
        kode_pos: kodePos,
        long: lng,
        lat: lat,
        phone,
        city_id: cityId,
      },
      {
        where: {
          id,
          user_id: userId,
        },
      }
    );

    res.status(200).send({
      message: "Edited",
    });
  } catch (err) {
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  const { id } = req.params;

  try {
    await userAddress.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      message: "Deleted",
    });
  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  const { username, email, phone, fullName, userId } = req.body;

  try {
    await user.update(
      {
        full_name: fullName,
        username,
        email,
        phone,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.status(200).send({
      message: "Edited",
    });
  } catch (err) {
    next(err);
  }
};

const editProfilePic = async (req, res, next) => {
  const { user_id } = req.params;

  const path = "/profile";
  const upload = pify(uploader(path, "PP").fields([{ name: "image" }]));

  try {
    const getData = await user.findOne({
      where: {
        id: parseInt(user_id),
      },
    });

    const oldImagePath = getData.imagepath;

    await upload(req, res);

    await user.update(
      {
        imagepath: `${path}/${req.files.image[0].filename}`,
      },
      {
        where: {
          id: parseInt(user_id),
        },
      }
    );

    if (oldImagePath !== null) {
      fs.unlinkSync(`public${oldImagePath}`);
    }

    res.status(200).send({
      message: "Uploaded",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
