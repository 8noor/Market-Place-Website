import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section>
        <div className="px-8 py-12 bg-purple-300">
          <div className="flex flex-col md:flex-row">
            {/* Box for the left content */}
            <div className="w-full md:w-[60%] h-[600px] border border-black bg-purple-900 text-white px-4 md:px-12 py-6 md:py-12 flex flex-col justify-between">
              <div>
                <h1 className="text-xl md:text-3xl md:text-left">
                  The furniture brand for the future, <br /> timeless designs
                </h1>
                <div className="flex justify-center md:justify-start">
                  <Link href={"http://localhost:3000/Product2"}>
                    <button
                      aria-label="View our collection"
                      className="w-[140px] h-[56px] bg-transparent text-white border border-gray-600 font-bold mt-12 hover:bg-purple-400 hover:text-white active:bg-purple-800 transition duration-300"
                    >
                      View collection
                    </button>
                  </Link>
                </div>
              </div>

              <div className="my-4 md:my-0">
                <p className="text-sm md:text-base md:text-left">
                  A new era in eco-friendly furniture with Avelon, the French
                  luxury retail brand with elegant fonts, tasteful colors, and a
                  beautiful way to display things digitally using modern web
                  technologies.
                </p>
              </div>
            </div>

            {/* Box for the image */}
            <div className="w-full md:w-[42%] h-[600px] bg-white flex justify-center items-center">
              <Image
                src="/images/chair.png"
                width={600}
                height={600}
                alt="Luxury chair from Avelon's collection"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
