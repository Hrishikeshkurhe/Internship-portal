// common/components/CourseCard.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CourseCard = ({ title, description, duration, level, image, price, fees }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fallbacks
  const finalImage =
    image || "https://images.pexels.com/photos/1181275/pexels-photo-1181275.jpeg";
  const finalPrice = fees || price || "Free";
  const finalLevel = level || "Beginner";

  const handleEnrollClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      
      {/* Course Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={finalImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              finalLevel === "Beginner"
                ? "bg-green-100 text-green-800"
                : finalLevel === "Intermediate"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {finalLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{duration || "2 months"}</span>
          </div>

          <div className="text-lg font-bold text-purple-600">
            {finalPrice === "Free" ? "Free" : `₹${finalPrice}`}
          </div>
        </div>

        {/* ENROLL BUTTON */}
        <button
          onClick={handleEnrollClick}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
