const mongoose = require("mongoose");
const Customer = require("../models/customer");

exports.createCustomer = (req, res) => {
  console.log(req.body);
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    count: req.body.count,
    content: req.body.content,
  });

  return customer
    .save()
    .then((newCustomer) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        customer: newCustomer,
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

exports.getAllCustomer = (req, res) => {
  Customer.find()
    .select("id name phone date time count content")
    .then((allCustomer) => {
      return res.status(200).json({
        success: true,
        message: "A list of all customer",
        customer: allCustomer,
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

exports.getSingleCustomer = async (req, res) => {
  console.log(req.params.id);
  Customer.findById(req.params.id)
    .then((singleCustomer) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleCustomer.name}`,
        customer: singleCustomer,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This Customer does not exist",
        error: err.message,
      });
    });
};

exports.updateCustomer = (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  Customer.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Customer is updated",
        updateCustomer: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};

exports.deleteCustomer = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Customer.findByIdAndRemove(id)
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
