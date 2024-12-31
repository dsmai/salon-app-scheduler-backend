const mongoose = require("mongoose");

const salonServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const orderSchema = new mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalonService",
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  createDate: {
    type: Date,
  },
  appDate: {
    type: Date,
  },
  total: {
    type: Number,
  },
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// Create models
let SalonService = mongoose.model("SalonService", salonServiceSchema);
let Order = mongoose.model("Order", orderSchema);
let Customer = mongoose.model("Customer", customerSchema);

module.exports = { SalonService, Order, Customer };
