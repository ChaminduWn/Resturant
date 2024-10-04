import ShippingMethod from "../models/shippingMethod.model.js";
import { errorHandler } from "../utils/error.js";

// Add new shipping methods
export const addShippingMethod = async (req, res, next) => {
  try {
    const requiredFields = ["shippingMethodName", "shippingCost"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const { shippingMethodName, shippingCost } = req.body;

    // Additional validation (like regex checks) can be performed here

    const newShippingMethod = {
      shippingMethodName,
      shippingCost,
    };

    const createdShippingMethod =
      await ShippingMethod.create(newShippingMethod);
    console.log("Shipping Method Added Successfully");

    return res.status(201).send(createdShippingMethod);
  } catch (error) {
    console.error("Failed to add payment shop data:", error);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get All Data from PaymentShop Collection

export const getShippingMethods = async (req, res, next) => {
  try {
    const createdShippingMethod = await ShippingMethod.find({});

    return res.status(200).json({
      count: createdShippingMethod.length,
      data: createdShippingMethod,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get data according to the ID
export const getIdShippingMethod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const createdShippingMethod = await ShippingMethod.findById(id);

    if (!createdShippingMethod) {
      return res
        .status(404)
        .json({ message: "According to the ID transaction not found (404)" });
    }
    return res.status(200).json(createdShippingMethod);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//update shipping methods
export const updateShippingMethod = async (req, res, next) => {
  try {
    if (!req.body.shippingMethodName || !req.body.shippingCost) {
      return res.status(400).send({
        message: `Send all required fields: shippingMethodName and shippingCost`,
      });
    }

    const { id } = req.params;
    const result = await ShippingMethod.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: `Shipping Method Not Found` });
    }
    return res
      .status(200)
      .json({ message: `Shipping Method updated sucessfully` });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//delete the package
export const deleteShippingMethod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ShippingMethod.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: `Shipping Method Not Found` });
    }
    return res
      .status(200)
      .json({ message: `Shipping Method deleted sucessfully` });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};