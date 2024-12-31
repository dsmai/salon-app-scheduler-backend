const serviceController = require("../controllers/serviceController");

const router = require("express").Router();

// ADD SERVICE - HTTP POST
router.post("/", serviceController.addService);

// GET ALL SERVICES - HTTP GET
router.get("/", serviceController.getAllServices);

// GET A SERVICE BY ID - HTTP GET
router.get("/:id", serviceController.getAService);

// UPDATE A SERVICE BY ID
router.put("/:id", serviceController.updateService);

// DELETE A SERVICE BY ID
router.delete("/:id", serviceController.deleteService);

module.exports = router;
