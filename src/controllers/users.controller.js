const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/enc_user");
const validateRegisterInput = require("../validation/register.validator");
const validateLoginInput = require("../validation/login.validator");

const userCtrl = {};
/**
 * @route POST /api/auth/register
 * @desc Register user
 * @access Public
 */
userCtrl.register = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newUser = new User();
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "Email ya registrado en el sistema " });
    } else {
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = newUser.encryptPassword(req.body.password);
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    }
  });
};
/**
 * @route POST /api/auth/login
 * @desc Login user and JWT returned
 * @access Public
 */
userCtrl.login = async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.status(400).json({ email: "Email no encontrado" });
  }
  const isMatch = existUser.comparePassword(req.body.password);
  if (isMatch) {
    const payload = {
      id: existUser.id,
      name: existUser.name,
      email: existUser.email,
      rol: existUser.rol,
    };
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        res.json({
          success: true,
          enc_user: payload,
          token: "Bearer " + token,
        });
      }
    );
  } else {
    return res.status(400).json({ password: "Password incorrecto" });
  }
};

userCtrl.findAll = async (req, res, next) => {
  const params = req.params || {};
  const query = req.query || {};

  const page = parseInt(query.page, 10) || 0;
  const perPage = parseInt(query.per_page, 10) || 10;

  User.find()
    .select("id name email created")
    .limit(perPage)
    .skip(page * perPage)

    .then((users) => res.status(400).json(users))
    .catch((err) => res.status(500).json(err.errors));
};

userCtrl.create = async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newUser = new User();
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "Email ya registrado en el sistema " });
    } else {
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = newUser.encryptPassword(req.body.password);
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    }
  });
};

userCtrl.findById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "User not found with id " + req.params.id });
      } else {
        res.status(400).json({ user });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "User not found with id " + req.params.id,
      });
    });
};

userCtrl.findOne = (req, res, next) => {
  const argument = req.body;
  User.findOne(argument)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "User not found with id " + req.params.id });
      } else {
        res.status(400).json({ user });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "User not found with id " + req.params.id,
      });
    });
};
module.exports = userCtrl;
