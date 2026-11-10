import express from "express";
const router = express.Router();
import customerController from "./controllers/customer.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

// Member
router.get("/customer/admin", customerController.getCustomer);
router.post("/customer/login", customerController.login);
router.post("/customer/signup", customerController.signup);
router.post(
  "/customer/logout",
  customerController.verifyAuth,
  customerController.logout,
);
router.get(
  "/customer/detail",
  customerController.verifyAuth,
  customerController.getCustomerDetail,
);
router.post(
  "/customer/update",
  customerController.verifyAuth,
  uploader("customers").single("image"),
  customerController.updateCustomer,
);
router.get("/member/top-customers", customerController.getTopCustomers);

// Product
router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  customerController.retrieveAuth,
  productController.getProduct,
);

// Order
router.post(
  "/order/create",
  customerController.verifyAuth,
  orderController.createOrder,
);
router.get(
  "/order/all",
  customerController.verifyAuth,
  orderController.getMyOrders,
);
router.post(
  "/order/update",
  customerController.verifyAuth,
  orderController.updateOrder,
);

export default router;
