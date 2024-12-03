"use client";

import React from "react";
import InfoCard from "../components/InfoCard";
import {SessionProvider} from "next-auth/react"
import UserButton from "@/components/user-button";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto ">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
        <div className="text-lg font-bold">Chọn nhóm theo topic</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">Learning Platform</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Community</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
        </div>
        <div>
          <SessionProvider>
            <UserButton />
          </SessionProvider>
        </div>
      </nav>

      {/* Jumbotron */}
      <div
        className="flex justify-center items-center h-96 bg-cover bg-center"
        style={{ backgroundImage: "url(https://littlevisuals.co/images/sunset.jpg)" }}
      >
        <div className="text-center">
          <h1 className="text-white text-5xl font-bold">Hãy chọn topic</h1>
          <h1 className="text-white text-5xl font-bold">phù hợp nhất với bạn!</h1>
        </div>
      </div>

      {/* Displaying Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <InfoCard
          title="Topic A"
          compatibility="50%"
          imageURL="https://littlevisuals.co/images/red_dawn.jpg"
          studentCount="4"
        />
        <InfoCard
          title="Topic B"
          compatibility="60%"
          imageURL="https://littlevisuals.co/images/sunset.jpg"
          studentCount="3"
        />
        <InfoCard
          title="Topic C"
          compatibility="10%"
          imageURL="https://littlevisuals.co/images/tail.jpg"
          studentCount="5"
        />
        <InfoCard
          title="Topic D"
          compatibility="90%"
          imageURL="https://littlevisuals.co/images/steam.jpg"
          studentCount="5"
        />
      </div>
    </div>
  );
};

export default Home;
