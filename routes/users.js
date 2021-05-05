const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
