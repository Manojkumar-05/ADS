import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { state, dispatch } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const total = state.items ? state.items.reduce((sum, item) => sum + item.price, 0) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {state.items && state.items.length > 0 ? (
        <>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <img src={`/assets/${item.image}`} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
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
  );
}

export default Cart;
