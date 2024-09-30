import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import foodRoutes from './routes/foodCategory.routes.js'

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

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
  });

  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/authEmployee',authEmployeeRoutes)

  app.use("/api/foods", foodRoutes);



app.use((err, req, res, next) => {
  const statusCode =err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json ({
    success: false,
    statusCode,
    message

  });

});


