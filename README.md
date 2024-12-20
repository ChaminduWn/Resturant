WN Restaurants

WN Restaurants is a restaurant management system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and styled with Tailwind CSS. This application provides a seamless experience for customers and management alike.

Table of Contents
Features
Customer Features
Admin Features
Manager Features
Technology Stack
Project Structure
Backend
Frontend
Usage
License
Features
Customer Features
Browse Menu: Everyone can view the available food items and search for specific items.
Ordering: Only registered users can order food items.
Payment: Customers can make payments online. Upon successful payment, a unique token number is generated.
Token Pickup: Customers can also pay outside the app and use the token number to collect their order easily.
Admin Features
Admin Management: A single admin can:
Add and manage managers.
View and control registered users and their details.
Manager Features
User Management: Managers can view and control registered users' details.
Menu Management: Managers can add, modify, or remove menu items.
Payment Details: Managers can view payment details.
Technology Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Project Structure
Backend
lua
Copy code
backend/  
  |-- controllers/  
  |-- models/  
  |-- routes/  
  |-- .env  
  |-- server.js  
Frontend
lua
Copy code
frontend/  
  |-- src/  
      |-- assets/  
      |-- components/  
      |-- pages/  
  |-- .env  
Usage
Screenshots
Home Page

Login Page

How It Works
For Customers:

Explore the menu, register, and place orders.
For Admin:

Manage managers and oversee user activities.
For Managers:

Handle menu items and view payment details.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for choosing WN Restaurants! Happy managing!
