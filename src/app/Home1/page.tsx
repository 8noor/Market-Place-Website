"use client";
import React from "react";

import Image from "next/image";
import Products from "../furniture/page";

const About = () => {
  return (
    <>
      <div>
        {/* Main Product Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-6/5 h-auto">
            <Image
              src={"/images/Hero Blocks.png"}
              height={600}
              width={600}
              alt="chair"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <Products />

        {/* Text Section */}
        <div className="flex flex-col md:flex-row w-full h-auto items-center px-20 py-10 space-y-8 md:space-y-0 gap-8">
          <div className="left-5 right-8 top-4 border-2 bg-[#2A254B] w-full md:w-3/5 p-8 md:p-20">
            <h1 className="text-xl md:text-2xl text-white">
              It started with a small idea
            </h1>
            <p className="text-white mt-1">
              A global brand with local beginnings, our story began in a small
              studio in South London in early 2014
            </p>
            <button className="bg-[#404040] h-12 w-40 rounded-sm mt-10 text-white hover:scale-105 hover:bg-[#a3a3a3] ">
              View collection
            </button>
          </div>

          {/* Image Section */}
          <Image
            src="/images/About main.png"
            alt="Service"
            width={70}
            height={70}
            className="w-full md:w-2/5 mt-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
          />
        </div>
      </div>

      <div className="relative w-full h-89 overflow-hidden">
        <Image
          src="/images/Home(1).png"
          alt="Background"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />

        <div className="flex items-center justify-center w-full h-auto bg-gray-100 p-4">
          <form className="flex items-center border rounded-md overflow-hidden">
            {/* Email Input */}
            <input
              type="email"
              placeholder="your@email.com"
              className="p-3 w-72 text-gray-700 focus:outline-none"
            />

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-purple-900 text-white px-6 py-3 hover:bg-purple-700 transition-all"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
