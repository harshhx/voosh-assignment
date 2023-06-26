const { Router } = require("express");
const auth = require('../middleware/authMiddleWare')
const orderController = require("../controllers/orderController")

const router = Router();
router.get("/getProfile", auth, orderController.getProfileDetails );
router.get("/order", auth, orderController.getAllOrdersForUser);
router.post("/order/create", auth, orderController.createOrder);

module.exports = router;