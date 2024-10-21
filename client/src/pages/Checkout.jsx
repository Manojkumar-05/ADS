import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Plus, Minus, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const { state: cartState } = useCart();
  const location = useLocation();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "creditCard",
  });

  useEffect(() => {
    // If items are passed via navigation state, use those. Otherwise, use cart items.
    if (location.state && location.state.items) {
      setCheckoutItems(location.state.items);
    } else {
      setCheckoutItems(cartState.items);
    }
  }, [location.state, cartState.items]);

  const total = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Order placed:", formData, checkoutItems);
    toast.success("Order placed successfully!");
    // Clear checkout items
    setCheckoutItems([]);
  };

  const increaseQuantity = (item) => {
    setCheckoutItems(prevItems =>
      prevItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCheckoutItems(prevItems =>
      prevItems.map(i =>
        i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
    );
  };

  const removeItem = (item) => {
    setCheckoutItems(prevItems => prevItems.filter(i => i.id !== item.id));
  };

  // Prevent body scrolling when the component is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable page scroll
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when component unmounts
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col flex-grow pt-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        {/* Billing Details */}
        <div className="h-[38.5rem] pr-4 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
                <option value="netBanking">Net Banking</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="overflow-y-auto bg-white p-6 rounded-lg shadow-lg h-[38.5rem]">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {checkoutItems.length > 0 ? (
              checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">
                      ₹{item.price.toLocaleString("en-IN")} x {item.quantity}
                    </p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => decreaseQuantity(item)}
                        className="bg-gray-200 p-1 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item)}
                        className="bg-gray-200 p-1 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold mr-4">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeItem(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your checkout is empty.</p>
            )}
          </div>
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <h4 className="text-lg font-semibold">Total</h4>
            <p className="text-lg font-semibold">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
