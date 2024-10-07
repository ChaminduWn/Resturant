import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import SignIn from "./pages/SignIn.jsx";
import Header from "./components/Header.jsx";
import Item from "./pages/Item.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import MemberView from "./pages/MemberView.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import AdminDashboard from "./pages/AdminDashborad.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoutes.jsx";
import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails.jsx";
import Shopping from "./components/ShoppingCart.jsx";
import Footer from "./components/Footer.jsx";

import CartPage from "./pages/CartPage.jsx";
// import PaymentPage from './pages/PaymentPage.jsx'
// import ShippingPage from './pages/ShippingPage..jsx'
// import PaymentSelection from './pages/PaymentSelect.jsx'
// import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PayNow from "./components/PayNow.jsx";
import PaymentReceipt from "./pages/PaymentReceipt.jsx";
import PaymentManager from "./components/PaymentManager.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashBoard />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        <Route path="/item" element={<Item />} />
        {/* <Route path="/shoppingCart" element={<ShoppingCart />} /> */}

        <Route path="/shoppingCart" element={<Shopping />} />

        <Route path="/payment-receipt" element={<PaymentReceipt />} />
        {/* <Route path="/payment-manager" element={<PaymentManager />} /> */}

        <Route path="/Checkout/payment" element={<PayNow />} />
        {/* <Route path="/Checkout/payment" element={<PayNow />} /> */}

        {/* <Route path="/Checkout/payment/shipping" element={<ShippingPage />} />
<Route
          path="/Checkout/payment/paymentSelect"
          element={<PaymentSelection />}
        />

<Route path="/Checkout/payment/success" element={<PaymentSuccess />} /> */}

        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/payment" element={<PaymentPage />} /> */}

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/member-view/:userId" element={<MemberView />} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route
            path="/view-employee-details/:empId"
            element={<AdminViewEmployeeDetails />}
          />

          <Route path="/member-view/:userId" element={<MemberView />} />
        </Route>

        {/* <Route path="/updateFoods/:id" element
        ={<FoodCategoryUpdate />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
