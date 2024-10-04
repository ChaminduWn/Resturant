import express from "express";
import {
  addPaymentShop,
  getShopPayments,
  getIdShopPayments,
  getEmailShopPayments,
} from "../controllers/checkoutShop.controller.js";

const router = express.Router();

router.post("/addPayment", addPaymentShop);
router.get("/getPayments", getShopPayments);
router.get("/paymentshopID/:id", getIdShopPayments);
router.get("/paymentshopEmail/:email", getEmailShopPayments);

export default router;