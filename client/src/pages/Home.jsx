import aboutCover from "../assets/aboutCover.png";
import workoutCover from "../assets/workoutCover.png";
import membershipCover from "../assets/membershipCover.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (

      <div className="w-full h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('./assets/home1.jpg')] bg-center bg-cover">

        <div className="flex flex-col max-w-6xl gap-6 p-40 px-4 mx-auto">
          <h1 className="text-[#d4d4d4] font-extrabold text-3xl lg:text-6xl uppercase">
            Special goodies for you foodies.
          </h1>
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
