import aboutCover from "../assets/aboutCover.png";
import workoutCover from "../assets/workoutCover.png";
import membershipCover from "../assets/membershipCover.png";
import { Link } from "react-router-dom";
import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (

      <div className="w-full h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('./assets/bg13.jpg')] bg-center bg-cover">
            
            <div className="pt-12 text-center">
  <h1 className="text-[#d4d4d4] font-extralight text-2xl lg:text-3xl uppercase opacity-75">
    Special goodies for you foodies.
  </h1>
</div>
        <div className="flex flex-col max-w-6xl gap-6 p-40 px-4 mx-auto">
        
          <div className="text-[#d4d4d4] text-xs sm:text-base">
            Embark on a culinary adventure with us! <br /> Savor exquisite
            dishes, crafted with love,
            <br /> and experience a dining atmosphere like no other. Book your
            table today!
          </div>
          <div className="flex-row">
          <Link to="/signin">
            <button className="text-[#d4d4d4] py-2 px-6 font-semibold uppercase rounded-full bg-[#A80000] hover:bg-[#4c0000]">
              Signin now
            </button>
            </Link>
            <Link to="/about">
              <button className="text-[#d4d4d4] py-2 px-6 font-semibold uppercase rounded-full border-2 border-[#A80000] hover:border-[#4c0000] mx-6">
                Learn More
              </button>
            </Link>
          </div>
        
     
          
          </div>
        </div>
  );
}
