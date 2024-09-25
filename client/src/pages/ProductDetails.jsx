import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { Plus, Minus } from 'lucide-react';

const products = [
  { 
    id: 1, 
    name: "Ashwagandha", 
    price: 1499, 
    image: "ashwagandha.jpg", 
    description: "Ashwagandha is a powerful adaptogen known for reducing stress, enhancing stamina, and boosting cognitive function. It helps in balancing cortisol levels, supports adrenal health, and promotes mental clarity.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves energy and vitality",
      "Enhances memory and cognitive function",
      "Supports adrenal health and hormone balance"
    ]
  },
  { 
    id: 2, 
    name: "Triphala", 
    price: 999, 
    image: "triphala.jpg", 
    description: "Triphala is a traditional Ayurvedic blend of three fruits, known for its detoxifying, rejuvenating, and digestive benefits. It helps maintain a healthy digestive system, supports weight management, and enhances overall vitality.",
    benefits: [
      "Promotes healthy digestion",
      "Detoxifies the body naturally",
      "Supports weight management",
      "Boosts immunity and overall well-being"
    ]
  },
  { 
    id: 3, 
    name: "Brahmi", 
    price: 1299, 
    image: "brahmi.jpg", 
    description: "Brahmi is an ancient Ayurvedic herb known for its brain-boosting properties. It enhances cognitive function, improves focus and memory, and helps reduce mental fatigue and stress.",
    benefits: [
      "Improves memory and concentration",
      "Reduces stress and anxiety",
      "Enhances cognitive function",
      "Supports mental clarity and brain health"
    ]
  },
  { 
    id: 4, 
    name: "Neem Capsules", 
    price: 799, 
    image: "neem.jpg", 
    description: "Neem is renowned for its powerful antibacterial, antifungal, and anti-inflammatory properties. Neem Capsules support healthy skin, detoxification, and immune function.",
    benefits: [
      "Promotes clear, healthy skin",
      "Supports immune system health",
      "Detoxifies the body",
      "Fights off infections and inflammation"
    ]
  },
  { 
    id: 5, 
    name: "Tulsi Drops", 
    price: 499, 
    image: "tulsi.jpg", 
    description: "Tulsi is known as 'The Queen of Herbs' for its immunity-boosting, stress-reducing, and health-promoting benefits. Tulsi Drops help strengthen the immune system, fight free radicals, and improve overall wellness.",
    benefits: [
      "Boosts immune function",
      "Reduces stress and promotes relaxation",
      "Supports respiratory health",
      "Rich in antioxidants"
    ]
  },
  { 
    id: 6, 
    name: "Shilajit Resin", 
    price: 2999, 
    image: "shilajit.jpg", 
    description: "Shilajit Resin is a rejuvenating substance that supports energy, vitality, and overall health. It helps boost stamina, enhance cognitive function, and promote longevity.",
    benefits: [
      "Boosts energy and endurance",
      "Improves stamina and strength",
      "Supports cognitive function and memory",
      "Promotes anti-aging and longevity"
    ]
  },
  { 
    id: 7, 
    name: "Amla Powder", 
    price: 399, 
    image: "amla.jpg", 
    description: "Amla, rich in Vitamin C and antioxidants, is a powerful immune booster. Amla Powder supports healthy digestion, promotes glowing skin, and helps in maintaining healthy hair.",
    benefits: [
      "Boosts immunity with high Vitamin C content",
      "Improves digestion and gut health",
      "Enhances skin and hair health",
      "Rich in antioxidants"
    ]
  },
  { 
    id: 8, 
    name: "Guggul Tablets", 
    price: 899, 
    image: "guggul.jpg", 
    description: "Guggul is a natural anti-inflammatory and cholesterol-lowering agent. Guggul Tablets help maintain healthy joints, support weight management, and promote heart health.",
    benefits: [
      "Reduces inflammation in joints",
      "Supports weight management",
      "Promotes heart and cholesterol health",
      "Boosts overall vitality"
    ]
  },
  { 
    id: 9, 
    name: "Moringa Capsules", 
    price: 699, 
    image: "moringa.jpg", 
    description: "Moringa is a nutrient-rich superfood packed with antioxidants. Moringa Capsules help improve energy levels, support digestion, and enhance overall well-being.",
    benefits: [
      "Boosts energy and vitality",
      "Rich in essential vitamins and minerals",
      "Improves digestion",
      "Supports overall health and well-being"
    ]
  },
  { 
    id: 10, 
    name: "Bhringraj Oil", 
    price: 1599, 
    image: "bhringraj.jpg", 
    description: "Bhringraj Oil is renowned for its hair growth-promoting properties. It nourishes the scalp, strengthens hair roots, reduces hair fall, and promotes shiny, healthy hair.",
    benefits: [
      "Promotes hair growth and reduces hair fall",
      "Nourishes the scalp and strengthens hair",
      "Adds shine and luster to hair",
      "Helps reduce dandruff"
    ]
  },
  { 
    id: 11, 
    name: "Guduchi Tablets", 
    price: 999, 
    image: "guduchi.jpg", 
    description: "Guduchi is known for its immune-boosting and detoxifying properties. Guduchi Tablets help strengthen immunity, cleanse the body, and promote overall well-being.",
    benefits: [
      "Boosts immune system",
      "Detoxifies the body",
      "Promotes healthy liver function",
      "Supports overall vitality"
    ]
  },
  { 
    id: 12, 
    name: "Karela Juice", 
    price: 1299, 
    image: "karela.jpg", 
    description: "Karela Juice is a natural remedy for managing blood sugar levels. It supports healthy digestion, improves metabolism, and promotes overall health.",
    benefits: [
      "Helps maintain healthy blood sugar levels",
      "Improves digestion and metabolism",
      "Supports liver function",
      "Promotes overall health and vitality"
    ]
  },
  { 
    id: 13, 
    name: "Manjistha Powder", 
    price: 799, 
    image: "manjistha.jpg", 
    description: "Manjistha is a powerful blood purifier that promotes healthy, glowing skin. Manjistha Powder supports detoxification, aids in clear skin, and balances the body.",
    benefits: [
      "Purifies the blood",
      "Promotes healthy, glowing skin",
      "Supports detoxification",
      "Balances the body's natural processes"
    ]
  },
  { 
    id: 14, 
    name: "Shatavari Capsules", 
    price: 1199, 
    image: "shatavari.jpg", 
    description: "Shatavari is a well-known Ayurvedic herb for supporting women's health. Shatavari Capsules help balance hormones, support reproductive health, and improve vitality.",
    benefits: [
      "Balances hormones in women",
      "Supports reproductive health",
      "Improves vitality and well-being",
      "Promotes digestive health"
    ]
  },
  { 
    id: 15, 
    name: "Arjuna Tablets", 
    price: 899, 
    image: "arjuna.jpg", 
    description: "Arjuna Tablets are known for their heart health benefits. They help maintain healthy blood pressure, improve circulation, and support cardiovascular wellness.",
    benefits: [
      "Supports heart health and circulation",
      "Helps maintain healthy blood pressure",
      "Promotes cardiovascular well-being",
      "Rich in antioxidants"
    ]
  },
  { 
    id: 16, 
    name: "Bala Oil", 
    price: 1799, 
    image: "bala.jpg", 
    description: "Bala Oil is used for its muscle-strengthening and rejuvenating properties. It helps promote healthy muscles and joints, providing relief from stiffness and pain.",
    benefits: [
      "Strengthens muscles and joints",
      "Promotes rejuvenation and vitality",
      "Relieves joint pain and stiffness",
      "Improves flexibility and mobility"
    ]
  },
  { 
    id: 17, 
    name: "Chyawanprash", 
    price: 1499, 
    image: "chyawanprash.jpg", 
    description: "Chyawanprash is a traditional Ayurvedic formulation known for boosting immunity and vitality. It contains a blend of herbs that rejuvenate the body and support overall health.",
    benefits: [
      "Boosts immunity and vitality",
      "Promotes energy and rejuvenation",
      "Supports respiratory health",
      "Rich in antioxidants and nutrients"
    ]
  },
  { 
    id: 18, 
    name: "Haritaki Powder", 
    price: 499, 
    image: "haritaki.jpg", 
    description: "Haritaki Powder is well-known for its digestive health benefits. It helps maintain healthy digestion, detoxifies the body, and supports overall well-being.",
    benefits: [
      "Promotes healthy digestion",
      "Detoxifies and cleanses the body",
      "Supports overall vitality",
      "Helps maintain digestive health"
    ]
  },
  { 
    id: 19, 
    name: "Jatamansi Oil", 
    price: 2499, 
    image: "jatamansi.jpg", 
    description: "Jatamansi Oil is known for its calming properties. It helps promote relaxation, improves sleep quality, and supports mental clarity.",
    benefits: [
      "Promotes relaxation and calmness",
      "Improves sleep quality",
      "Supports cognitive function",
      "Reduces stress and anxiety"
    ]
  },
  { 
    id: 20, 
    name: "Kumkumadi Oil", 
    price: 2999, 
    image: "kumkumadi.jpg", 
    description: "Kumkumadi Oil is a premium facial oil known for its skin rejuvenating properties. It brightens the complexion, reduces dark circles, and promotes radiant skin.",
    benefits: [
      "Brightens complexion",
      "Reduces dark circles",
      "Promotes radiant skin",
      "Enhances skin texture"
    ]
  },
  { 
    id: 21, 
    name: "Pippali Powder", 
    price: 699, 
    image: "pippali.jpg", 
    description: "Pippali is known for its respiratory benefits. It supports lung health and enhances digestion.",
    benefits: [
      "Supports respiratory health",
      "Enhances digestion",
      "Promotes metabolic function",
      "Boosts immunity"
    ]
  },
  { 
    id: 22, 
    name: "Saffron Extract", 
    price: 1999, 
    image: "saffron.jpg", 
    description: "Saffron is known for its mood-enhancing properties. It promotes emotional well-being and supports skin health.",
    benefits: [
      "Enhances mood",
      "Supports skin health",
      "Promotes relaxation",
      "Rich in antioxidants"
    ]
  },
  { 
    id: 23, 
    name: "Vacha Powder", 
    price: 899, 
    image: "vacha.jpg", 
    description: "Vacha is known for its cognitive benefits. It supports memory and enhances clarity of thought.",
    benefits: [
      "Supports cognitive function",
      "Enhances memory",
      "Promotes mental clarity",
      "Reduces mental fatigue"
    ]
  },
  { 
    id: 24, 
    name: "Yashtimadhu Powder", 
    price: 799, 
    image: "yashtimadhu.jpg", 
    description: "Yashtimadhu is known for its soothing properties. It supports digestive health and enhances respiratory function.",
    benefits: [
      "Soothes digestive system",
      "Supports respiratory health",
      "Enhances immune function",
      "Reduces inflammation"
    ]
  },
  { 
    id: 25, 
    name: "Zingiber Powder", 
    price: 499, 
    image: "zingiber.jpg", 
    description: "Zingiber, or ginger, is known for its digestive and anti-inflammatory properties. It supports gastrointestinal health and boosts immunity.",
    benefits: [
      "Aids digestion",
      "Reduces inflammation",
      "Boosts immune system",
      "Enhances circulation"
    ]
  }
];

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const isProductInCart = state.items.some(item => item.id === product.id);

  const addToCart = () => {
    if (isProductInCart) {
      dispatch({ type: 'INCREASE_QUANTITY', payload: product });
      toast.info(`Increased quantity of ${product.name} in your cart.`);
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
      toast.success(`${product.name} added to cart!`);
    }
  };

  const buyNow = () => {
    // Navigate to checkout with the current product without modifying the cart
    navigate('/checkout', { state: { items: [{ ...product, quantity }] } });
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="md:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={`/assets/${product.image}`} alt={product.name} className="w-full rounded-lg shadow-md" />
        </motion.div>
        <motion.div 
          className="md:w-1/2 md:pl-8 mt-4 md:mt-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-green-600 font-semibold mb-4">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-4">
            <button 
              onClick={decreaseQuantity}
              className="bg-gray-200 p-2 rounded-full"
            >
              <Minus size={20} />
            </button>
            <span className="mx-4 text-xl">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="bg-gray-200 p-2 rounded-full"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={addToCart}
              className={`flex-grow ${isProductInCart ? 'bg-gray-400' : 'bg-green-600'} text-white px-6 py-2 rounded hover:bg-green-700`}
              disabled={isProductInCart}
            >
              {isProductInCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={buyNow}
              className="flex-grow bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
