const { SalonService, Order } = require("../model/model");

const orderController = {
  // ADD AN ORDER
  addOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      if (req.body.services) {
        const serviceIdList = req.body.services;

        // loop through these services id, use Promise.all for concurrent execution
        await Promise.all(
          serviceIdList.map(async (serviceId) => {
            const service = await SalonService.findById(serviceId);
            await service.updateOne({ $push: { orders: savedOrder._id } });
          })
        );
      }
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL ORDERS
  getAllOrders: async (req, res) => {
    try {
      const allOrders = await Order.find();
      res.status(200).json(allOrders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET AN ORDER
  getAnOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("services");
      res.status(200).json(order);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  // UPDATE AN ORDER
  updateOrder: async (req, res) => {
    try {
      // Dynamically extract allowed fields from SalonService schema,
      // and store in a Set for O(1) lookup (because Set in implemented with hashtable underneath)
      const allowedFields = new Set(
        Object.keys(Order.schema.paths).filter(
          (field) => field !== "__v" && field !== "_id"
        )
      );

      // Validate the request body
      const requestFields = Object.keys(req.body);
      // Loop through requestFields, check if any of them is not in allowedFields, then send back 404
      // Runtime complexity: O(n) because set lookup is O(1)
      for (const requestField of requestFields) {
        if (!allowedFields.has(requestField)) {
          return res
            .status(400)
            .json({ error: "Invalid field in request", requestField });
        }
      }

      const order = await Order.findById(req.params.id);
      await order.updateOne({ $set: req.body });
      res.status(200).json("Order updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteOrder: async (req, res) => {
    try {
      await SalonService.updateMany(
        { orders: req.params.id },
        { $pull: { orders: req.params.id } }
      );
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order deleted successfully!");
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = orderController;
