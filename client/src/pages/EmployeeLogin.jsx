import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cover_Image from "../assets/emplogin1.jpg";
import { Alert, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
export default function EmployeeLogin() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.email || !formData.password){

      return dispatch(signInFailure('All fields are required'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/authemployee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/admin-dashboard?tab=profile');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  }

  return (
    <>

    <div className="flex w-full h-screen">
      <div className="flex-col hidden h-screen md:relative md:w-1/2 md:flex">
        <div className="absolute top-[50%] left-[10%] flex flex-col"></div>
        <img src={Cover_Image} className="object-cover w-full h-full" />
      </div>
      <div className="w-full md:w-1/2 h-screen bg-[#1f1f1f] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[550px] m-auto">
          <div className="flex flex-col w-full mb-2">
            <h1 className="text-2xl font-normal text-[#d4d4d4] my-8">
              Foods and Resturants
            </h1>
            <h3 className="text-4xl font-semibold mb-4 text-[#d4d4d4]">
              Login
            </h3>
            <p className="text-base mb-2 text-[#d4d4d4]">
              Welcome Back! Please enter your details
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-[#d4d4d4]">Email</label>
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md text-white py-2 my-2 bg-[#707070] outline-none focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                id="email"
                onChange={handleChange}
              />
              <label htmlFor="" className="text-[#d4d4d4]">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md text-white py-2 my-2 bg-[#707070]  border outline-none focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                id="password"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full my-4">
              <button type="submit" className="w-full text-[#d4d4d4] my-2 bg-[#4c0042] rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Login'}
              </button>
            </div>
          </form>
          {errorMessage && (
            <Alert className="p-2 mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
    </>
  );
}