const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidator } = require("./../validations/auth");
// const verifyToken = require("./../middlewares/verifyToken");

exports.createUser = async (req, res) => {
  console.log(req.body);
  const { error } = registerValidator(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const checkUserExist = await User.findOne({
    username: req.body.username,
  });
  if (checkUserExist)
    return res.status(422).send("ten nay da dc dat roi em =))");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  console.log("%c%s", "color: #24eb24", hashPassword);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
  });

  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New user created successfully",
        user: newUser,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) return res.status(422).send("username is not correct");

  const checkPassword = bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(422).send(" Password is not correct");

  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return res.status(200).json({
    status: "ok",
    message: "Dang nhap thanh cong",
    token,
    user,
  });
};

exports.getAllUser = (req, res) => {
  User.find()
    .select("id username password")
    .then((allUser) => {
      return res.status(200).json({
        success: true,
        message: "A list of all User",
        user: allUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

exports.getSingleUser = async (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then((singleUser) => {
      res.status(200).json({
        success: true,
        message: `More on`,
        user: singleUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This User does not exist",
        error: err.message,
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  User.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User is updated",
        updateUser: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server said: djt me dell xoa dc.",
      })
    );
};
