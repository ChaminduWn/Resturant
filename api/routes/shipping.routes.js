import express from "express";
import {
  addShippingMethod,
  getShippingMethods,
  getIdShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
} from "../controllers/shippingMethod.controller.js";

const router = express.Router();

router.post("/addShippingMethod", addShippingMethod);
router.get("/getShippingMethods", getShippingMethods);
router.get("/getShippingID/:id", getIdShippingMethod);
router.put("/updateShipping/:id", updateShippingMethod);
router.delete("/deleteShipping/:id", deleteShippingMethod);

export default router;