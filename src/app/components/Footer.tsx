"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };

  return (
    <footer className="bg-purple-900 text-white py-3 px-3 gap-1">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">
        {/* Menu */}
        <div>
          <h3 className="font-light text-sm mb-4">Menu</h3>
          <ul>
            <li>
              <Link href="#" className="text-sm font-light hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-sm font-light hover:text-gray-400"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-light hover:text-gray-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-sm font-light hover:text-gray-400"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-sm font-light hover:text-gray-400"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="gap-3">
          <h3 className="font-light text-sm mb-4">Categories</h3>
          <ul>
            <li>
              <Link
                href="/category/plant-pots"
                className="text-sm font-light hover:text-gray-400"
              >
                Plant Pots
              </Link>
            </li>
            <li>
              <Link
                href="/category/ceramics"
                className="text-sm font-light hover:text-gray-400"
              >
                Ceramics
              </Link>
            </li>
            <li>
              <Link
                href="/category/tables"
                className="text-sm font-light hover:text-gray-400"
              >
                Tables
              </Link>
            </li>
            <li>
              <Link
                href="/category/chairs"
                className="text-sm font-light hover:text-gray-400"
              >
                Chairs
              </Link>
            </li>
            <li>
              <Link
                href="/category/lights"
                className="text-sm font-light hover:text-gray-400"
              >
                Lighting
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-light text-sm mb-4">Company</h3>
          <ul>
            <li>
              <Link
                href="/about"
                className="text-sm font-light hover:text-gray-400"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-sm font-light hover:text-gray-400"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-sm font-light hover:text-gray-400"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm font-light hover:text-gray-400"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-light hover:text-gray-400"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-light text-sm mb-4">About</h3>
          <p className="text-sm font-light">
            We are a company committed to providing high-quality products to our
            customers. Our mission is to create an exceptional shopping
            experience through innovative designs and excellent customer
            service.
          </p>
          <Link
            href="/about"
            className="text-sm font-light hover:text-gray-400 mt-2 block"
          >
            Learn more about us
          </Link>
        </div>

        {/* Join Our Mailing List */}
        <div className="gap-2">
          <h3 className="font-light text-lg mb-4 text-white">
            Join Our Mailing List
          </h3>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="xyz123@gmail.com"
              aria-label="Enter your email address"
              className="w-full max-w-xs p-2 bg-purple-700 text-[#333333] border border-[#4E4D93] focus:outline-none focus:border-[#6200ea]"
            />
            <button
              type="submit"
              className="p-3 bg-white text-[#4E4D93] border border-[#4E4D93] hover:bg-[#d4d4d4]"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>

      <hr />

      <div className="text-center mt-12 text-sm">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 mt-4">
        <Link
          href="https://www.tiktok.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-white text-2xl hover:text-gray-400" />
        </Link>
        <Link
          href="https://www.facebook.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare className="text-white text-2xl hover:text-gray-400" />
        </Link>
        <Link
          href="https://www.instagram.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-white text-2xl hover:text-gray-400" />
        </Link>
        <Link
          href="https://twitter.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-white text-2xl hover:text-gray-400" />
        </Link>
        <Link
          href="https://www.skype.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSkype className="text-white text-2xl hover:text-gray-400" />
        </Link>
        <Link
          href="https://www.pinterest.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPinterest className="text-white text-2xl hover:text-gray-400" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
