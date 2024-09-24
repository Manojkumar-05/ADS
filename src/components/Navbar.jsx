import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Home, ShoppingBag, ShoppingCart, CreditCard, LogIn, UserPlus, ArrowUp } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    lastScrollY.current = window.scrollY;

    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: showNavbar ? 0 : -50, opacity: showNavbar ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="bg-green-800 text-white p-4 shadow-md fixed w-full z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <Leaf className="mr-2 text-green-300" />
            <span className="hidden sm:inline">Ayurvedic Digital Nest</span>
            <span className="sm:hidden">ADS</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-300 transition duration-300 flex items-center">
              <Home className="mr-1" size={18} />
              Home
            </Link>
            <Link to="/products" className="hover:text-green-300 transition duration-300 flex items-center">
              <ShoppingBag className="mr-1" size={18} />
              Products
            </Link>
            <Link to="/cart" className="hover:text-green-300 transition duration-300 flex items-center">
              <ShoppingCart className="mr-1" size={18} />
              Cart
            </Link>
            <Link to="/checkout" className="hover:text-green-300 transition duration-300 flex items-center">
              <CreditCard className="mr-1" size={18} />
              Checkout
            </Link>
            <Link to="/login" className="hover:text-green-300 transition duration-300 flex items-center">
              <LogIn className="mr-1" size={18} />
              Login
            </Link>
            <Link to="/signup" className="hover:text-green-300 transition duration-300 flex items-center">
              <UserPlus className="mr-1" size={18} />
              Sign Up
            </Link>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-2xl">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-green-800 z-50 flex flex-col items-center justify-center"
            >
              <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
                <X size={24} />
              </button>
              <div className="flex flex-col items-center space-y-6">
                <Link to="/" className="hover:text-green-300 transition duration-300 flex items-center text-xl" onClick={toggleMenu}>
                  <Home className="mr-2" size={24} />
                  Home
                </Link>
                <Link to="/products" className="hover:text-green-300 transition duration-300 flex items-center text-xl" onClick={toggleMenu}>
                  <ShoppingBag className="mr-2" size={24} />
                  Products
                </Link>
                <Link to="/cart" className="hover:text-green-300 transition duration-300 flex items-center text-xl" onClick={toggleMenu}>
                  <ShoppingCart className="mr-2" size={24} />
                  Cart
                </Link>
                <Link to="/checkout" className="hover:text-green-300 transition duration-300 flex items-center text-xl" onClick={toggleMenu}>
                  <CreditCard className="mr-2" size={24} />
                  Checkout
                </Link>
                <Link to="/login" className="hover:text-green-300 transition duration-300 flex items-center text-xl" onClick={toggleMenu}>
                  <LogIn className="mr-2" size={24} />
                  Login
                </Link>
                <Link to="/signup" className="hover:text-green-300 transition duration-300 flex items-center text-xl" onClick={toggleMenu}>
                  <UserPlus className="mr-2" size={24} />
                  Sign Up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}

export default Navbar;