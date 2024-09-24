import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Ashwagandha",
    price: 1499,
    image: "ashwagandha.jpg",
    description:
      "Ashwagandha is an ancient medicinal herb with multiple health benefits. It can reduce anxiety and stress, help fight depression, boost fertility and testosterone in men, and even boost brain function.",
  },
  {
    id: 2,
    name: "Triphala",
    price: 999,
    image: "triphala.jpg",
    description:
      "Triphala is a traditional Ayurvedic herbal formulation consisting of three fruits: Amalaki, Bibhitaki, and Haritaki. It is known for its rejuvenating and detoxifying properties.",
  },
  {
    id: 3,
    name: "Brahmi",
    price: 1299,
    image: "brahmi.jpg",
    description:
      "Brahmi is a powerful herb that has been used in traditional Ayurvedic medicine for centuries. It is known for its ability to enhance memory, improve concentration, and reduce stress.",
  },
  {
    id: 4,
    name: "Neem Capsules",
    price: 799,
    image: "neem.jpg",
    description:
      "Neem Capsules are known for their antibacterial, antifungal, and anti-inflammatory properties. They help in purifying the blood and maintaining healthy skin.",
  },
  {
    id: 5,
    name: "Tulsi Drops",
    price: 499,
    image: "tulsi.jpg",
    description:
      "Tulsi Drops are made from the pure extract of Tulsi leaves. They help in boosting immunity, reducing stress, and promoting overall health.",
  },
  {
    id: 6,
    name: "Shilajit Resin",
    price: 2999,
    image: "shilajit.jpg",
    description:
      "Shilajit Resin is a natural substance that is known for its rejuvenating and anti-aging properties. It helps in boosting energy, improving stamina, and enhancing overall well-being.",
  },
  {
    id: 7,
    name: "Amla Powder",
    price: 399,
    image: "amla.jpg",
    description:
      "Amla Powder is rich in Vitamin C and antioxidants. It helps in boosting immunity, improving digestion, and promoting healthy hair and skin.",
  },
  {
    id: 8,
    name: "Guggul Tablets",
    price: 899,
    image: "guggul.jpg",
    description:
      "Guggul Tablets are known for their anti-inflammatory and cholesterol-lowering properties. They help in maintaining healthy joints and supporting weight management.",
  },
  {
    id: 9,
    name: "Moringa Capsules",
    price: 699,
    image: "moringa.jpg",
    description:
      "Moringa Capsules are packed with essential nutrients and antioxidants. They help in boosting energy, improving digestion, and supporting overall health.",
  },
  {
    id: 10,
    name: "Bhringraj Oil",
    price: 1599,
    image: "bhringraj.jpg",
    description:
      "Bhringraj Oil is known for its hair growth-promoting properties. It helps in nourishing the scalp, reducing hair fall, and promoting healthy and lustrous hair.",
  },
  {
    id: 11,
    name: "Guduchi Tablets",
    price: 999,
    image: "guduchi.jpg",
    description:
      "Guduchi Tablets are known for their immune-boosting and detoxifying properties. They help in promoting overall health and well-being.",
  },
  {
    id: 12,
    name: "Karela Juice",
    price: 1299,
    image: "karela.jpg",
    description:
      "Karela Juice is known for its blood sugar-lowering properties. It helps in maintaining healthy blood sugar levels and promoting overall health.",
  },
  {
    id: 13,
    name: "Manjistha Powder",
    price: 799,
    image: "manjistha.jpg",
    description:
      "Manjistha Powder is known for its blood-purifying and skin-clearing properties. It helps in promoting healthy and glowing skin.",
  },
  {
    id: 14,
    name: "Shatavari Capsules",
    price: 1199,
    image: "shatavari.jpg",
    description:
      "Shatavari Capsules are known for their hormone-balancing and reproductive health-promoting properties. They help in supporting women's health and well-being.",
  },
  {
    id: 15,
    name: "Arjuna Tablets",
    price: 899,
    image: "arjuna.jpg",
    description:
      "Arjuna Tablets are known for their heart health-promoting properties. They help in maintaining healthy blood pressure and supporting cardiovascular health.",
  },
  {
    id: 16,
    name: "Bala Oil",
    price: 1799,
    image: "bala.jpg",
    description:
      "Bala Oil is known for its muscle-strengthening and rejuvenating properties. It helps in promoting healthy muscles and joints.",
  },
  {
    id: 17,
    name: "Chyawanprash",
    price: 1499,
    image: "chyawanprash.jpg",
    description:
      "Chyawanprash is a traditional Ayurvedic formulation that is known for its immune-boosting and rejuvenating properties. It helps in promoting overall health and well-being.",
  },
  {
    id: 18,
    name: "Haritaki Powder",
    price: 499,
    image: "haritaki.jpg",
    description:
      "Haritaki Powder is known for its digestive health-promoting properties. It helps in improving digestion, relieving constipation, and promoting overall health.",
  },
  {
    id: 19,
    name: "Jatamansi Oil",
    price: 2499,
    image: "jatamansi.jpg",
    description:
      "Jatamansi Oil is known for its calming and stress-relieving properties. It helps in promoting relaxation, improving sleep, and supporting mental well-being.",
  },
  {
    id: 20,
    name: "Kumkumadi Oil",
    price: 2999,
    image: "kumkumadi.jpg",
    description:
      "Kumkumadi Oil is known for its skin-brightening and anti-aging properties. It helps in promoting healthy and glowing skin.",
  },
  {
    id: 21,
    name: "Licorice Root Powder",
    price: 599,
    image: "licorice.jpg",
    description:
      "Licorice Root Powder is known for its anti-inflammatory and skin-soothing properties. It helps in promoting healthy and clear skin.",
  },
  {
    id: 22,
    name: "Musta Powder",
    price: 699,
    image: "musta.jpg",
    description:
      "Musta Powder is known for its digestive health-promoting properties. It helps in improving digestion, relieving bloating, and promoting overall health.",
  },
  {
    id: 23,
    name: "Punarnava Tablets",
    price: 999,
    image: "punarnava.jpg",
    description:
      "Punarnava Tablets are known for their kidney health-promoting properties. They help in maintaining healthy kidney function and supporting overall health.",
  },
  {
    id: 24,
    name: "Saffron Threads",
    price: 4999,
    image: "saffron.jpg",
    description:
      "Saffron Threads are known for their antioxidant and mood-enhancing properties. They help in promoting overall health and well-being.",
  },
  {
    id: 25,
    name: "Trikatu Powder",
    price: 499,
    image: "trikatu.jpg",
    description:
      "Trikatu Powder is known for its digestive health-promoting properties. It helps in improving digestion, relieving indigestion, and promoting overall health.",
  },
];

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  const buyNow = () => {
    dispatch({ type: "CLEAR_CART" });
    addToCart();
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <img
              src={`/assets/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h2>
            <p className="text-2xl text-green-600 font-semibold mb-6">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
