import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-32 px-4 sm:px-8 text-center transition-all duration-500">
        {/* Glowing Orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-[200px] h-[200px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[200px] h-[200px] bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight drop-shadow">
            Find the Best Courses for You
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover, Learn, and Upskill with our wide range of high-quality, engaging, and career-focused courses.
          </p>

          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-full shadow-md overflow-hidden max-w-xl mx-auto mb-6 border border-gray-200 dark:border-gray-700 transition"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-white placeholder-gray-500 bg-transparent"
            />
            <Button
              type="submit"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
              Search
            </Button>
          </form>

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white/70 dark:bg-white/10 backdrop-blur-md text-blue-600 dark:text-white px-6 py-2 rounded-full border border-blue-600 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-800 transition font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>

      {/* Our Courses Section */}
      <div className="bg-[#f0f4ff] dark:bg-gray-900 py-20 px-4 sm:px-8 transition">
         <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Unlock Your Potential 
        </h2> 

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            "Data Science",
            "Next.js Tutorial",
            "Python Basics",
            "Docker for Beginners",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                {title}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore essential concepts and practical projects in {title}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

