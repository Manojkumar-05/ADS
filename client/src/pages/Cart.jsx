import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

function Cart() {
  const { state, dispatch } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const increaseQuantity = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  };

  const decreaseQuantity = (item) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  };

  const emptyCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.info("Cart has been emptied");
  };

  const total = state.items 
    ? state.items.reduce((sum, item) => sum + item.price * item.quantity, 0) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        {state.items && state.items.length > 0 && (
          <button
            onClick={emptyCart}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} className="mr-2" />
            Empty Cart
          </button>
        )}
      </div>
      <div className="h-[calc(100vh-200px)] overflow-y-auto">
        {state.items && state.items.length > 0 ? (
          <>
            <AnimatePresence>
              {state.items.map((item) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
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
                  </div>
                  <motion.button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="mt-8">
              <div className="flex justify-between items-center border-t pt-4">
                <h4 className="text-xl font-semibold">Total</h4>
                <p className="text-xl font-semibold">₹{total.toLocaleString("en-IN")}</p>
              </div>
              <Link
                to="/checkout"
                className="mt-4 block w-full bg-green-600 text-white text-center px-4 py-2 rounded-md hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
