const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
  getQueryCustomer,
} = require("../controllers/customer");
router.get("/", getQueryCustomer);
router.post("/", createCustomer);
router.get("/", getAllCustomer);
router.get("/:id", getSingleCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
