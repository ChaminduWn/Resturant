import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'
import DashBoard from './pages/DashBoard'
import SignIn from './pages/SignIn'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>    

    </BrowserRouter>
  )
}
