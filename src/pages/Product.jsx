import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const products = [
  { id: 1, name: "Ashwagandha", price: 1499, image: "ashwagandha.jpg" },
  { id: 2, name: "Triphala", price: 999, image: "triphala.jpg" },
  { id: 3, name: "Brahmi", price: 1299, image: "brahmi.jpg" },
  { id: 4, name: "Neem Capsules", price: 799, image: "neem.jpg" },
  { id: 5, name: "Tulsi Drops", price: 499, image: "tulsi.jpg" },
  { id: 6, name: "Shilajit Resin", price: 2999, image: "shilajit.jpg" },
  { id: 7, name: "Amla Powder", price: 399, image: "amla.jpg" },
  { id: 8, name: "Guggul Tablets", price: 899, image: "guggul.jpg" },
  { id: 9, name: "Moringa Capsules", price: 699, image: "moringa.jpg" },
  { id: 10, name: "Bhringraj Oil", price: 1599, image: "bhringraj.jpg" },
  { id: 11, name: "Guduchi Tablets", price: 999, image: "guduchi.jpg" },
  { id: 12, name: "Karela Juice", price: 1299, image: "karela.jpg" },
  { id: 13, name: "Manjistha Powder", price: 799, image: "manjistha.jpg" },
  { id: 14, name: "Shatavari Capsules", price: 1199, image: "shatavari.jpg" },
  { id: 15, name: "Arjuna Tablets", price: 899, image: "arjuna.jpg" },
  { id: 16, name: "Bala Oil", price: 1799, image: "bala.jpg" },
  { id: 17, name: "Chyawanprash", price: 1499, image: "chyawanprash.jpg" },
  { id: 18, name: "Haritaki Powder", price: 499, image: "haritaki.jpg" },
  { id: 19, name: "Jatamansi Oil", price: 2499, image: "jatamansi.jpg" },
  { id: 20, name: "Kumkumadi Oil", price: 2999, image: "kumkumadi.jpg" },
  { id: 21, name: "Licorice Root Powder", price: 599, image: "licorice.jpg" },
  { id: 22, name: "Musta Powder", price: 699, image: "musta.jpg" },
  { id: 23, name: "Punarnava Tablets", price: 999, image: "punarnava.jpg" },
  { id: 24, name: "Saffron Threads", price: 4999, image: "saffron.jpg" },
  { id: 25, name: "Trikatu Powder", price: 499, image: "trikatu.jpg" },
];

function ProductList() {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  const buyNow = (product) => {
    dispatch({ type: "CLEAR_CART" });
    addToCart(product);
    navigate("/checkout");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Our Products</h2>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search className="absolute right-3 top-3 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <Link to={`/product/${product.id}`}>
              <img
                src={`/assets/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-gray-200"
              >
                <ShoppingCart className="mr-2 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
