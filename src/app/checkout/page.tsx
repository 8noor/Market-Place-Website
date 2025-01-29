"use client";

import { useState, useEffect } from "react";
import { getFurnitureItems } from "@/app/action/action";
import Link from "next/link";
import { Product } from "@/types/Products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";

const CheckoutPage = () => {
  const [furnitureItems, setFurnitureItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getFurnitureItems();
        setFurnitureItems(items || []);
      } catch (error) {
        console.error("Error fetching furniture items:", error);
      }
    };
    fetchItems();

    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = furnitureItems?.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const total = Math.max(subtotal - Number(discount || 0), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      localStorage.removeItem("appliedDiscount");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link href="/furniture" className="text-[#666666] hover:text-black transition text-sm">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order</h2>
            {furnitureItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-3 border-b">
                <div className="w-16 h-16 rounded overflow-hidden">
                  {item.image ? (
                    <Image
                      src={urlFor(item.image).url() || "/fallback-image.jpg"}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.productName}</h3>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">${item.price * item.quantity}</p>
              </div>
              
            ))}
            <div className="text-right pt-4">
              <p className="text-sm">Subtotal: <span className="font-medium">${subtotal}</span></p>
              <p className="text-sm">Discount: <span className="font-medium">-${discount}</span></p>
              <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formValues).map((key) => (
                <div key={key}>
                  <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
                  <input
                    id={key}
                    placeholder={`Enter your ${key}`}
                    value={formValues[key as keyof typeof formValues]}
                    onChange={handleInputChange}
                    className="border w-full p-2"
                  />
                  {formErrors[key as keyof typeof formErrors] && (
                    <p className="text-sm text-red-500">{key} is required.</p>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;





