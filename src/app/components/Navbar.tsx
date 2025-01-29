"use client";
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link"; // Correct import

const Navbar: React.FC = () => {
  // State to toggle the visibility of the cart
  const [isCartVisible, setCartVisible] = useState(false);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  return (
    <nav className="bg-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black text-2xl font-light">
          <a href="#">Avion</a>
        </div>

        {/* Links and search bar */}
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="flex items-center px-1 py-1 rounded-md bg-gray-100">
            <FaSearch className="text-gray-500" />
          </div>

          {/* Links */}
          <Link
            href="/Home1"
            className="text-gray-400 border-gray-500 hover:text-black"
          >
            Home
          </Link>

          {/* About Link */}
          <Link
            href="/About"
            className="text-gray-400 border-gray-500 hover:text-black"
          >
            About
          </Link>

          <Link
            href="/Contact"
            className="text-gray-400 border-gray-500 hover:text-black"
          >
            Contact
          </Link>

          {/* Icons */}
          <Link href="/Cart">
            <button className="text-gray-400 border-gray-500 hover:text-black">
              <FaUser />
            </button>
          </Link>

          {/* Cart Icon */}
          <button
            className="text-gray-400 border-gray-500 hover:text-black"
            onClick={toggleCart} // Toggle cart visibility on click
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-t border-gray-300 my-2"></div>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto flex justify-center space-x-10 py-2">
        <Link href="/Product2" className="text-gray-400 hover:text-gray-500">
          Plant Pots
        </Link>
        <Link href="#ceramics" className="text-gray-400 hover:text-gray-500">
          Ceramics
        </Link>
        <Link href="#tables" className="text-gray-400 hover:text-gray-500">
          Tables
        </Link>
        <Link
          href="/ProductListing"
          className="text-gray-400 hover:text-gray-500"
        >
          Chairs
        </Link>
        <Link href="#crockery" className="text-gray-400 hover:text-gray-500">
          Crockery
        </Link>
        <Link href="#tableware" className="text-gray-400 hover:text-gray-500">
          Tableware
        </Link>
        <Link href="#cutlery" className="text-gray-400 hover:text-gray-500">
          Cutlery
        </Link>
      </div>

      {/* Conditional rendering of the cart */}
      {isCartVisible && (
        <div className="absolute top-16 right-4 p-4 bg-white shadow-lg border rounded-lg w-64">
          <h3 className="text-xl font-semibold">Your Cart</h3>
          <ul className="space-y-2 mt-4">
            <li>Item 1 - $10</li>
            <li>Item 2 - $15</li>
            <li>Item 3 - $20</li>
          </ul>
          <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md">
            Checkout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
