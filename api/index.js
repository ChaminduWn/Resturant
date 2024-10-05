import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import foodRoutes from './routes/foodCategory.routes.js'
import cartRoutes from './routes/cart.routes.js'
import authEmployeeRoutes from './routes/authEmployee.routes.js'
import cookieParser from 'cookie-parser';

import employeeRoutes from "./routes/employee.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import checkoutShopRoutes from "./routes/checkoutShop.routes.js";


// import shippingRoutes from "./routes/shipping.routes.js";



dotenv.config();   




mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is Connected');
  })
  .catch((err) => {
    console.log(err);
  }); 

const app = express();

app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
  });

  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoutes);

  app.use("/api/employee", employeeRoutes);
  app.use('/api/authEmployee',authEmployeeRoutes)

  app.use("/api/foods", foodRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/payment', paymentRoutes);

  app.use("/api/pay", checkoutShopRoutes);
  // app.use("/api/shipping", shippingRoutes);



app.use((err, req, res, next) => {
  const statusCode =err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json ({
    success: false,
    statusCode,
    message

  });

});


