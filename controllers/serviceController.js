const { SalonService, Order } = require("../model/model");

const serviceController = {
  // ADD A SERVICE
  addService: async (req, res) => {
    try {
      const newSalonService = new SalonService(req.body);
      const savedSalonService = await newSalonService.save();
      res.status(200).json(savedSalonService);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SERVICES
  getAllServices: async (req, res) => {
    try {
      const allServices = await SalonService.find();
      res.status(200).json(allServices);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET A SERVICE
  getAService: async (req, res) => {
    try {
      const service = await SalonService.findById(req.params.id);
      res.status(200).json(service);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE A SERVICE
  updateService: async (req, res) => {
    try {
      // Dynamically extract allowed fields from SalonService schema,
      // and store in a Set for O(1) lookup (because Set in implemented with hashtable underneath)
      const allowedFields = new Set(
        Object.keys(SalonService.schema.paths).filter(
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

      const service = await SalonService.findById(req.params.id);
      await service.updateOne({ $set: req.body });
      res.status(200).json("Service updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteService: async (req, res) => {
    try {
      // Make sure to delete this service from associated order
      await Order.updateMany(
        { services: req.params.id },
        { $pull: { services: req.params.id } }
      );
      await SalonService.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
};

module.exports = serviceController;
