import Employee from "../models/employee.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const create = async (req, res, next) => {
  const { firstname, lastname, address , email, nic, phone, role, shift} = req.body;

  const nicRegex = /^(?:[0-9]{9}[VvXx]||[0-9]{12})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  if (
    !firstname ||
    !lastname ||
    !address ||
    !email ||
    !nic ||
    !phone ||
    !role ||
    firstname === "" ||
    lastname === "" ||
    address === "" ||
    email === "" ||
    nic === ""  ||
    role === "" 
  ) {
    next(errorHandler(400, "All are required"));
  }
  

   // Check NIC validity
   if (!nicRegex.test(nic)) {
    return next(errorHandler(400, "NIC is invalid"));
  }

  // Check email validity
  if (!emailRegex.test(email)) {
    return next(errorHandler(400, "Email is invalid"));
  }

  // Check phone number validity
  if (!phoneRegex.test(phone)) {
    return next(errorHandler(400, "Phone number is invalid"));
  }

   // Check if data already exists in the database
   const existingEmployeeByEmail = await Employee.findOne({ email });
   const existingEmployeeByPhone = await Employee.findOne({ phone });
   const existingEmployeeByNIC = await Employee.findOne({ nic });

   if (existingEmployeeByEmail || existingEmployeeByPhone || existingEmployeeByNIC) {
    return next(errorHandler(400,"Employee with this email, phone number, or NIC already exists"));
   }
  

  const hashedPassword = bcryptjs.hashSync(nic, 10);
  const fullName = firstname + lastname;
  const nameToUsername = fullName.split(" ").join("") +  + Math.random().toString(9).slice(-4);
  const newEmployee = new Employee({
    firstname,
    lastname,
    address,
    email,
    nic,
    phone,
    username: nameToUsername,
    password: hashedPassword,
    role,
    
  });
  try {
    await newEmployee.save();
    res.json("Employee created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validEmployee = await Employee.findOne({ email });
    if (!validEmployee) {
      next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validEmployee.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }
    const token = jwt.sign(
      {
        empId: validEmployee._id,
        isAdmin: validEmployee.isAdmin,
        role: validEmployee.role,
        username: validEmployee.username,
        name: validEmployee.firstname + " " + validEmployee.lastname,
      },
      process.env.JWT_SECRET
    );
    
    const { password: pass, ...rest} = validEmployee._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};