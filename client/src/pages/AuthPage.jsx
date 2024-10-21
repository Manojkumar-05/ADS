import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, Mail, Lock, User, Leaf, Feather, Wind, Sun, Cloud, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

let supabase;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client created successfully');
} else {
  console.error('Supabase URL or Anon Key is missing');
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    navigate(isLogin ? '/signup' : '/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!supabase) {
      setError('Supabase client is not initialized');
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            }
          }
        });

        if (error) throw error;

        toast.success('Signed up successfully! Please check your email for verification.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden pt-24">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Leaf className="absolute top-32 left-10 w-16 h-16 text-green-600" />
        <Feather className="absolute top-48 right-20 w-16 h-16 text-blue-400" />
        <Wind className="absolute bottom-10 left-20 w-16 h-16 text-teal-500" />
        <Sun className="absolute top-64 left-40 w-20 h-20 text-yellow-400" />
        <Cloud className="absolute top-80 right-40 w-24 h-24 text-blue-300" />
        <Droplet className="absolute bottom-20 right-20 w-12 h-12 text-blue-500" />
      </div>

      {/* Welcome section with smooth transition */}
      <motion.div 
        className="w-full md:w-1/2 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-8 relative z-10"
        initial={{ x: isLogin ? 0 : '100%' }}
        animate={{ x: isLogin ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="text-green-800 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Welcome to Digital Nest</h1>
          <p className="text-xl md:text-2xl mb-8">Balance your body and soul</p>
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse delay-200"></div>
          </div>
          <button
            onClick={toggleForm}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Log In'}
          </button>
        </div>
      </motion.div>

      {/* Login/Signup form */}
      <motion.div 
        className="w-full md:w-1/2 bg-white bg-opacity-90 flex items-center justify-center p-8 relative z-10"
        initial={{ x: isLogin ? 0 : '-100%' }}
        animate={{ x: isLogin ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center font-serif text-green-800">
            {isLogin ? 'Log In to Your Digital Nest Account' : 'Sign Up for Digital Nest'}
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">Name</label>
                <div className="relative">
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-2 pl-10 rounded-full border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 bg-white" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={18} />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">Email</label>
              <div className="relative">
                <input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-2 pl-10 rounded-full border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 bg-white" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={18} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-2 pl-10 rounded-full border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 bg-white" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={18} />
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">
              {isLogin ? 'Log In' : 'Sign Up'}
              <ArrowRight className="inline-block ml-2" size={18} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
