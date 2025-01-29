import React from "react";
import ProductListing from "../components/ProductListing";
import Image from "next/image";

const About = () => { 
  return (
    <>
      <div>
        {/* Product Listing Section */}
        <ProductListing /> 

        {/* Hero Section */}
        <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center  text-center px-4 md:px-16 py-8 hover:scale-105">
          <div className="md:w-2/4 text-xl md:text-2xl text-center md:text-left text-custom-purple">
            A brand built on the love of craftsmanship, quality and outstanding customer service
          </div>
          <div className="mt-6 md:mt-0">
            <button className="bg-gray-200 h-12 w-40 rounded-sm text-custom-purple hover:bg-blue-600">
              View our products
            </button>
          </div>
        </div>
 {/* Text Section */}
  <div className="flex flex-col md:flex-row w-full h-auto items-center px-20 py-10 space-y-8 md:space-y-0 gap-8">
 
  <div className="left-5 right-8 top-4 border-2 bg-[#2A254B] w-full md:w-3/5 p-8 md:p-20">
    <h1 className="text-xl md:text-2xl text-white">
      It started with a small idea
    </h1>
    <p className="text-white mt-1">
      A global brand with local beginnings, our story began in a small studio in South London in early 2014
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
        {/* Service Section */}
        <div className="flex flex-col md:flex-row w-full h-auto items-center px-4 py-16 space-y-8 md:space-y-0 gap-4">
          <Image
            src="/images/About second.png"
            alt="Service"
            width={50}
            height={50}
            className="w-full md:w-2/5 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
          />
          <div className="border-2 bg-slate-200 w-full md:w-3/5 p-8 md:p-20 ">
            <h1 className="text-xl md:text-2xl text-custom-purple">
              Our service isn&rsquo;t just personal, it&rsquo;s actually hyper-personally exquisite
            </h1>
            <p className="text-custom-purple mt-1">
              When we started Avion, the idea was simple. Make high-quality furniture affordable and available for the
              mass market. Handmade, and lovingly crafted furniture and homeware is what we live, breathe, and design so
              our Chelsea boutique became the hotbed for the London interior design community.
            </p>
            <button className="bg-white h-12 w-40 rounded-sm mt-10 text-custom-purpel hover:scale-105 hover:bg-[#d4d4d4]">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full h-auto pb-16">
          <h1 className="text-center text-custom-purple text-xl">What makes our brand different</h1>
          <div className="flex flex-wrap justify-center md:justify-evenly px-4 py-10 gap-8">
            {[
              {
                img: "/images/Delivery.png",
                title: "Next day as standard",
                desc: "Order before 3pm and get your order the next day as standard",
              },
              {
                img: "/images/check.png",
                title: "Made by true artisans",
                desc: "Handmade crafted goods made with real passion and craftsmanship",
              },
              {
                img: "/images/Purchase.png",
                title: "Unbeatable prices",
                desc: "For our materials and quality you won’t find better prices anywhere",
              },
              {
                img: "/images/Sprout.png",
                title: "Recycled packaging",
                desc: "We use 100% recycled materials to ensure our footprint is more manageable",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-200 w-72 h-auto rounded-sm px-6 py-8 text-center">
                <Image
                  src={item.img}
                  alt={item.title} // Added 'alt' text for accessibility
                  width={30}
                  height={30}
                  className="mx-auto transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-1"
                />
                <h1 className="text-custom-purple text-lg mt-4">{item.title}</h1>
                <p className="text-custom-purple mt-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full h-auto bg-gray-100 py-8">
          <div className="m-auto w-11/12 bg-white p-8 md:p-16">
            <h1 className="text-custom-purple text-2xl md:text-3xl text-center">
              Join the club and get the benefits
            </h1>
            <p className="text-custom-purple text-center mt-6 text-sm md:text-base">
            Sign up for our newsletter and receive exclusive offers on new <br/>
             ranges, sales, pop up stores and more
            </p>
            
            <div className="flex items-center justify-center w-full h-auto p-4">
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
        </div>
      </div>


     
    </>
  );
};

export default About; 



