import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Leaf, ShoppingCart, Star, User, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion"; 
import backgroundImage from "../assets/Home.avif";

// Import product images
import ashwagandhaImage from "../assets/products/ashwagandha.jpg";
import turmericCreamImage from "../assets/products/turmeric-cream.jpeg";
import triphalaImage from "../assets/products/triphala.jpg";
import neemOilImage from "../assets/products/neem-oil.jpg";
import brahmiTonicImage from "../assets/products/brahmi-tonic.jpg";
import shatavariImage from "../assets/products/shatavari.jpg";
import amlaImage from "../assets/products/amla.jpg";
import guduchiImage from "../assets/products/guduchi.jpg";

export default function HomePage() {
  const featuredProductsRef = useRef(null);
  const featuredProductsInView = useInView(featuredProductsRef, { once: true, amount: 0.2 });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 xl:py-56 bg-green-50 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backgroundBlendMode: "overlay",
            }}
          ></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-green-400 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Discover the Ancient Wisdom of Ayurveda
                </h1>
                <p className="mx-auto max-w-[800px] text-white md:text-xl lg:text-2xl">
                  Embark on a journey to holistic well-being with our curated
                  selection of authentic Ayurvedic products. Experience the
                  harmony of mind, body, and spirit through time-tested natural
                  remedies.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-white">Our products are:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    "100% Natural",
                    "Ethically Sourced",
                    "Traditionally Prepared",
                    "Scientifically Verified",
                  ].map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                    >
                      <Leaf className="mr-1 h-4 w-4" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-x-4">
                <Link to="/products">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" ref={featuredProductsRef}>
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Featured Ayurvedic Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 1,
                  name: "Ashwagandha Supplement",
                  image: ashwagandhaImage,
                },
                {
                  id: 2,
                  name: "Turmeric Face Cream",
                  image: turmericCreamImage,
                },
                { id: 3, name: "Triphala Powder", image: triphalaImage },
                { id: 4, name: "Neem Hair Oil", image: neemOilImage },
                {
                  id: 5,
                  name: "Brahmi Brain Tonic",
                  image: brahmiTonicImage,
                },
                {
                  id: 6,
                  name: "Shatavari Women's Health",
                  image: shatavariImage,
                },
                { id: 7, name: "Amla Vitamin C Boost", image: amlaImage },
                { id: 8, name: "Guduchi Immune Support", image: guduchiImage },
              ].map((product, index) => (
                <motion.div
                  key={product.id}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuredProductsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="p-6 space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-current text-yellow-500"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹1,999</span>
                      <Link
                        to={`/product/${product.id}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Benefits of Ayurveda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Natural Healing",
                  description:
                    "Harness the power of nature to heal and balance your body.",
                },
                {
                  title: "Holistic Approach",
                  description:
                    "Address the root cause of issues, not just the symptoms.",
                },
                {
                  title: "Personalized Care",
                  description:
                    "Tailored treatments based on your unique body constitution.",
                },
                {
                  title: "Preventive Health",
                  description:
                    "Maintain good health and prevent diseases naturally.",
                },
                {
                  title: "Mind-Body Balance",
                  description:
                    "Achieve harmony between your physical and mental well-being.",
                },
                {
                  title: "Time-Tested Wisdom",
                  description:
                    "Benefit from thousands of years of traditional knowledge.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm"
                >
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mb-4">
                      <Leaf className="h-6 w-6 text-green-800" />
                    </div>
                    <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
