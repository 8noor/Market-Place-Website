"use client";

import { sanityFetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Product {
  quantity: number;
  productName: ReactNode | Iterable<ReactNode>;
  _id: string;
  
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  tags: string[];
  slug: { current: string };

}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await sanityFetch({ query: allProducts });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    Swal.fire(
      "Success!",
      `${product.name} has been added to your cart!`,
      "success"
    );
  };

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter((item) => item._id !== id));
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };



const router = useRouter();


  const handleProceed = () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success!",
          "Your order has been successfully processed!",
          "success"
        );
        router.push("/checkout")
        setCart([]); // ✅ Ensure this matches your state variable
      }
    });
  };

  const handleIncrement = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-center text-slate-800 mt-4 mb-6 text-2xl font-bold">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
            <Link href={`/page/${product.slug?.current}`}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md"
                loading="lazy"
              />
            </Link>
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <div className="flex justify-center items-center mt-4">
                <p className="text-slate-600 font-bold">${product.price}</p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-green-500 ml-2">
                    {product.discountPercentage}% OFF
                  </p>
                )}
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-100 p-8 rounded-lg shadow-md">
        <h2 className="text-lg font-black text-purple-400">
          Products Added To Cart
        </h2>
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={`${item._id}-${index}`}
                className="flex justify-between items-center bg-white shadow-sm p-2 rounded-md"
              >
                <div>
                  <Image
                    src={item.imageUrl}
                    alt={`Cart item: ${item.name}`}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">
                      {item.productName}
                    </h2>
                    <p className="text-gray-500">Price: ${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black text-center">
            Your cart is empty. Please add products.
          </p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-xl font-bold text-gray-800">
              ${calculateTotal()}
            </p>
          </div>
          <button
            onClick={handleProceed}
            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
}
