import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  // Prevent body scrolling when the component is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable page scroll
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when component unmounts
    };
  }, []);

  return (
    <div className="h-screen pt-8 bg-gradient-to-br from-green-400 to-green-800 flex  justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl h-fit max-w-md w-full">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-green-800">
            Join Ayurvedic Digital Nest
          </h2>
          <form className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-12 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="form-checkbox text-green-600 rounded focus:ring-green-500"
                required 
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-green-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 duration-200 ease-in-out"
            >
              Create Account
            </button>
          </form>
        </div>
        <div className="bg-green-100 p-6 text-center">
          <p className="text-green-800">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}