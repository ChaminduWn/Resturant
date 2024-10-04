import PaymentShop from "../models/checkoutShop.model.js";
import { errorHandler } from "../utils/error.js";

// save Payment Shop
export const addPaymentShop = async (req, res, next) => {
  try {
    const requiredFields = [
      "paymentId",
      "email",
      "phoneNumber",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "shippingMethod",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const {
      paymentId,
      email,
      phoneNumber,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      shippingMethod,
    } = req.body;

    // Additional validation (like regex checks) can be performed here

    const newPaymentShop = {
      paymentId,
      email,
      phoneNumber,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      shippingMethod,
    };

    const createdPaymentShop = await PaymentShop.create(newPaymentShop);
    console.log("Data Added Successfully");

    return res.status(201).send(createdPaymentShop);
  } catch (error) {
    console.error("Failed to add payment shop data:", error);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get All Data from PaymentShop Collection

export const getShopPayments = async (req, res, next) => {
  try {
    const createdPaymentShop = await PaymentShop.find({});

    return res.status(200).json({
      count: createdPaymentShop.length,
      data: createdPaymentShop,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get data according to the ID
export const getIdShopPayments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const createdPaymentShop = await PaymentShop.findById(id);

    if (!createdPaymentShop) {
      return res
        .status(404)
        .json({ message: "According to the ID transaction not found (404)" });
    }
    return res.status(200).json(createdPaymentShop);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

// Get data according to the Email
export const getEmailShopPayments = async (req, res, next) => {
  try {
    const { email } = req.params;
    const paymentShop = await PaymentShop.findOne({ email: email });

    if (!paymentShop) {
      return res
        .status(404)
        .json({ message: "No transaction found for the provided email." });
    }
    return res.status(200).json(paymentShop);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

export const checkout = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Populate the checkout form with cart items
    const paymentData = {
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      address: req.body.address, // Address passed from the front-end
      shippingMethod: req.body.shippingMethod, // Shipping method from front-end
    };

    // Remove unnecessary discount logic here

    // Save the payment data (PaymentShop)
    const paymentShop = await PaymentShop.create(paymentData);

    // Clear cart after successful checkout
    await Cart.deleteOne({ userId });

    return res.status(200).json(paymentShop);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, { message: error.message }));
  }
};