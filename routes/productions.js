const express = require("express");
const router = express.Router();

const {
  createProduction,
  getAllProduction,
  getSingleProduction,
  getQueryProduction,
  updateProduction,
  deleteProduction,
  // getPaginationProduction,
} = require("../controllers/production");
// router.get("/", getPaginationProduction);
router.post("/", createProduction);
router.get("/", getQueryProduction);
router.get("/:id", getSingleProduction);
router.put("/:id", updateProduction);
router.delete("/:id", deleteProduction);
router.get("/", getAllProduction);

module.exports = router;
