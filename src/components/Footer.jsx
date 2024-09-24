import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Ayurvedic Digital Nest</h3>
            <p className="text-gray-300">
              Ayurvedic Digital Nest is dedicated to bringing you the finest Ayurvedic products to promote holistic health and well-being. Our products are sourced ethically and prepared traditionally to ensure the highest quality.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
              <li><Link to="/products" className="hover:text-green-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Products</Link></li>
              <li><Link to="/cart" className="hover:text-green-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-green-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Checkout</Link></li>
              <li><Link to="/contact" className="hover:text-green-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2" />
                <span>info@ayurvedaessence.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center">
                <span>123 Ayurvedic Street, Wellness City, India</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2024 Ayurvedic Digital Nest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;