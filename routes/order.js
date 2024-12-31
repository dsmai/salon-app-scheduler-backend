const orderController = require("../controllers/orderController");

const router = require("express").Router();

// ADD ORDER
router.post("/", orderController.addOrder);

// GET ALL ORDERS
router.get("/", orderController.getAllOrders);

// GET AN ORDER BY ID
router.get("/:id", orderController.getAnOrder);

// UPDATE AN ORDER BY ID
router.put("/:id", orderController.updateOrder);

// DELETE AN ORDER BY ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
