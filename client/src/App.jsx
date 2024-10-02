import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import DashBoard from './pages/DashBoard.jsx'
import SignIn from './pages/SignIn.jsx'
import Header from './components/Header.jsx'
import Shop from './pages/Shop.jsx'
import Dashboard from './pages/DashBoard.jsx'
import MemberView from './pages/MemberView.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import AdminDashboard from "./pages/AdminDashborad.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoutes.jsx";
import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails.jsx";



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

        <Route path="/shop" element={<Shop />} />


        <Route element={<PrivateRoute />} >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/member-view/:userId" element={<MemberView />} />
         </Route>    




         <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />


        

          <Route path="/view-employee-details/:empId" element={<AdminViewEmployeeDetails />}
          />        
      
          <Route path="/member-view/:userId" element={<MemberView />} />

        
        </Route>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* <Route path="/updateFoods/:id" element={<FoodCategoryUpdate />} /> */}



 



      </Routes>    

    </BrowserRouter>
  )
}
