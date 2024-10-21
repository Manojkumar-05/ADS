import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

// Import images
import ashwagandhaImg from '../assets/products/ashwagandha.jpg';
import triphalaImg from '../assets/products/triphala.jpg';
import brahmiImg from '../assets/products/brahmi-tonic.jpg';
import neemImg from '../assets/products/neem-oil.jpg';
import tulsiImg from '../assets/products/tulsi.jpg';
import shilajitImg from '../assets/products/shilajit.jpg';
import amlaImg from '../assets/products/amla.jpg';
import guggulImg from '../assets/products/guggul.jpg';
import moringaImg from '../assets/products/musta.jpeg';
import bhringrajImg from '../assets/products/bhringraj.jpg';
import guduchiImg from '../assets/products/guduchi.jpg';
import karelaImg from '../assets/products/karela.jpeg';
import manjisthaImg from '../assets/products/manjistha..jpg';
import shatavariImg from '../assets/products/shatavari.jpg';
import arjunaImg from '../assets/products/arjuna.jpg';
import balaImg from '../assets/products/bala.jpg';
import chyawanprashImg from '../assets/products/chyawanprash.jpg';
import haritakiImg from '../assets/products/haritaki.jpg';
import jatamansiImg from '../assets/products/jatamansi.jpg';
import kumkumadiImg from '../assets/products/kumkumadi.jpg';
import licoriceImg from '../assets/products/licorice.jpeg';
import mustaImg from '../assets/products/musta.jpeg';
import punarnavaImg from '../assets/products/punarnava.jpg';
import saffronImg from '../assets/products/saffron.jpg';
import trikatuImg from '../assets/products/trikatu-powder.jpg';

const products = [
  { id: 1, name: 'Ashwagandha', price: 1499, image: ashwagandhaImg },
  { id: 2, name: 'Triphala', price: 999, image: triphalaImg },
  { id: 3, name: 'Brahmi', price: 1299, image: brahmiImg },
  { id: 4, name: 'Neem Capsules', price: 799, image: neemImg },
  { id: 5, name: 'Tulsi Drops', price: 499, image: tulsiImg },
  { id: 6, name: 'Shilajit Resin', price: 2999, image: shilajitImg },
  { id: 7, name: 'Amla Powder', price: 399, image: amlaImg },
  { id: 8, name: 'Guggul Tablets', price: 899, image: guggulImg },
  { id: 9, name: 'Moringa Capsules', price: 699, image: moringaImg },
  { id: 10, name: 'Bhringraj Oil', price: 1599, image: bhringrajImg },
  { id: 11, name: 'Guduchi Tablets', price: 999, image: guduchiImg },
  { id: 12, name: 'Karela Juice', price: 1299, image: karelaImg },
  { id: 13, name: 'Manjistha Powder', price: 799, image: manjisthaImg },
  { id: 14, name: 'Shatavari Capsules', price: 1199, image: shatavariImg },
  { id: 15, name: 'Arjuna Tablets', price: 899, image: arjunaImg },
  { id: 16, name: 'Bala Oil', price: 1799, image: balaImg },
  { id: 17, name: 'Chyawanprash', price: 1499, image: chyawanprashImg },
  { id: 18, name: 'Haritaki Powder', price: 499, image: haritakiImg },
  { id: 19, name: 'Jatamansi Oil', price: 2499, image: jatamansiImg },
  { id: 20, name: 'Kumkumadi Oil', price: 2999, image: kumkumadiImg },
  { id: 21, name: 'Licorice Root Powder', price: 599, image: licoriceImg },
  { id: 22, name: 'Musta Powder', price: 699, image: mustaImg },
  { id: 23, name: 'Punarnava Tablets', price: 999, image: punarnavaImg },
  { id: 24, name: 'Saffron Threads', price: 4999, image: saffronImg },
  { id: 25, name: 'Trikatu Powder', price: 499, image: trikatuImg },
];


function ProductList() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    const isProductInCart = state.items.some(item => item.id === product.id);
    if (isProductInCart) {
      dispatch({ type: 'INCREASE_QUANTITY', payload: product });
      toast.info(`${product.name} already in your cart.`);
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
      toast.success(`${product.name} added to cart!`);
    }
  };

  const buyNow = (product) => {
    navigate('/checkout', { state: { items: [{ ...product, quantity: 1 }] } });
  };

  const filteredProducts = products.filter(product =>
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
          <motion.div 
            key={product.id} 
            className="bg-white p-4 rounded-lg shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-h-96 object-contail mb-4 rounded" 
              />
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price.toLocaleString('en-IN')}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(product)} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-gray-200">
                <ShoppingCart className="mr-2 text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;