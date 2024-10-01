import aboutCover from "../assets/aboutCover.png";
import workoutCover from "../assets/workoutCover.png";
import membershipCover from "../assets/membershipCover.png";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('./assets/home1.jpg')] bg-center bg-cover">
     
        <Header />

        <div className="flex flex-col max-w-6xl gap-6 p-40 px-4 mx-auto">
          <h1 className="text-[#d4d4d4] font-extrabold text-3xl lg:text-6xl uppercase">
          Special goodies for you foodies.
          </h1>
          <div className="text-[#d4d4d4] text-xs sm:text-base">
            Discover your fitness journey with us! <br /> Explore top-notch
            equipment, tailed programs, and <br /> motivating classes, Start
            today!
          </div>
          <div className="flex-row">
            <button className="text-[#d4d4d4] py-2 px-6 font-semibold uppercase rounded-full bg-[#A80000] hover:bg-[#4c0000]">
              Join now
            </button>
            <button className="text-[#d4d4d4] py-2 px-6 font-semibold uppercase rounded-full border-2 border-[#A80000] hover:border-[#4c0000] mx-6">
              Learn more
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1f1f1f] p-10">
        <div className="bg-[#707070]">
          <div className="flex flex-col md:flex-row md:p-10">
            <div className="relative flex items-center p-2">
              <img src={aboutCover} alt="" className="opacity-75" />
              <div className="absolute bottom-5 left-0  text-[#d4d4d4] p-4">
                <h2 className="text-lg md:text-xl">About</h2>
                <p className="text-2xl font-bold ">CJ Fitness Centre.</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="relative flex items-center p-2">
                <Link to="/WorkoutPlans">
                  <img src={workoutCover} alt="" className="opacity-75" />
                </Link>
                <div className="absolute bottom-5 left-0  text-[#d4d4d4] p-4">
                  <h2 className="text-lg md:text-xl">Request a</h2>
                  <p className="text-2xl font-bold">Work-out Plan</p>
                </div>
              </div>

              
            </div>
          <Link to="/SubscriptionPackages">
            <div className="relative flex items-center p-2">
              <img src={membershipCover} alt="" className="opacity-75" />
              <div className="absolute bottom-5 left-0  text-[#d4d4d4] p-4">
                <h2 className="text-lg md:text-xl">Select a</h2>
                <p className="text-2xl font-bold ">Membership Plans</p>
              </div>
            </div>
          </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('./assets/memberShipCover2.jpg')] bg-center bg-cover flex items-end">
        <div className="absolute bottom-0 flex flex-col items-end justify-between gap-2 p-20 px-4 mx-auto right-16 max-w-7xl">
          <h1 className="text-[#d4d4d4] font-extrabold text-2xl lg:text-6xl mt-56">
            Start your fitness journey
          </h1>
          <div className="text-[#d4d4d4] text-sm sm:text-base">
            Become a member
          </div>
          <div className="">
            <button className="text-[#d4d4d4] py-1.5 px-6 border-2 border-[#d4d4d4] p-1.5 rounded-full">
              Join now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1f1f1f] py-10">
        <div className="relative w-full h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.6)),url('./assets/supplementcover.jpeg')] bg-center bg-cover">
          <div className="absolute bottom-0 flex flex-col gap-2 p-20 px-4 mx-auto left-16 max-w-7xl">
            <h1 className="text-[#d4d4d4] font-extrabold text-2xl lg:text-6xl mt-56">
              Buy Supplement
            </h1>

            <div className="">
              <button className="text-[#d4d4d4] py-1.5 px-6 border-2 border-[#d4d4d4] p-1.5 rounded-full">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}