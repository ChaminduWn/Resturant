import React from "react";
import { FaUtensils, FaLeaf, FaHome, FaUsers } from "react-icons/fa"; // FontAwesome icons

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl p-10 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          About Us
        </h2>
        <p className="text-lg text-center text-gray-700">
          Welcome to{" "}
          <span className="font-bold text-blue-500">[Your Restaurant Name]</span>, 
          where passion for flavor meets a love for the finest ingredients. Established 
          with the goal of offering a memorable dining experience, our restaurant combines 
          exquisite cuisine, a warm ambiance, and excellent service.
        </p>

        <div className="space-y-6">
          {/* Our Story Section */}
          <Section 
            icon={<FaUtensils className="text-3xl text-blue-500" />} 
            title="Our Story"
            description="From humble beginnings, [Your Restaurant Name] was born out of a deep 
            love for food and a desire to create a space where people could come together 
            to enjoy mouth-watering dishes. Our chefs, with their innovative approach to 
            traditional recipes, have crafted a menu that tantalizes the taste buds and 
            warms the soul."
          />

          {/* Our Philosophy Section */}
          <Section 
            icon={<FaLeaf className="text-3xl text-green-500" />} 
            title="Our Philosophy"
            description="We believe that good food is the heart of every great gathering. That's why 
            we source only the freshest, high-quality ingredients and prepare each dish with love 
            and attention to detail. Our commitment is to create a unique and unforgettable dining 
            experience for each and every one of our guests."
          />

          {/* Our Ambiance Section */}
          <Section 
            icon={<FaHome className="text-3xl text-yellow-500" />} 
            title="Our Ambiance"
            description="Whether you’re enjoying a romantic dinner, a family meal, or a special celebration, 
            our cozy and welcoming atmosphere sets the perfect backdrop for every occasion. We’ve 
            created a space that feels like home, with a touch of elegance and warmth, making it the 
            ideal setting for a wonderful dining experience."
          />

          {/* Join Us Section */}
          <Section 
            icon={<FaUsers className="text-3xl text-indigo-500" />} 
            title="Join Us"
            description="At [Your Restaurant Name], we don’t just serve food – we create experiences. 
            Join us for a delightful meal and allow us to treat you to our signature hospitality 
            and flavorful dishes that will keep you coming back for more."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ icon, title, description }) => (
  <div>
    <div className="flex items-center space-x-4">
      {icon}
      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
)
