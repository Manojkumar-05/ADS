import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-400 to-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-green-800">
            Welcome Back
          </h2>
          <form className="space-y-6">
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
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-green-600 rounded focus:ring-green-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-800 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="bg-green-100 p-8 text-center">
          <p className="text-green-800">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 font-semibold hover:text-green-800 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}