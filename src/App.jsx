import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ParallaxBackground from './components/ParallaxBackground';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import About from './pages/About';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  // Seeding our mock database of items
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "1994 Reversible Denim Jacket",
      category: "Vintage",
      size: "L",
      condition: "Excellent",
      brand: "Levi's Curated",
      price: 145,
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
      description: "An authentic 90s archive piece. Fully reversible featuring light wash denim on one side and premium green plaid flannel lining on the other. Heavyweight hardware.",
      seller: "Vintage Archive"
    },
    {
      id: 2,
      title: "Minimalist Linen Trench Coat",
      category: "Sustainable",
      size: "M",
      condition: "New",
      brand: "Eileen Earth",
      price: 210,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
      description: "Tailored from 100% organic French linen. Undyed, features organic tagua-nut buttons and a relaxed unisex drape. Perfect for clean fashion layering.",
      seller: "Earth Studio"
    },
    {
      id: 3,
      title: "Retro Colorblock Fleece Pullover",
      category: "Streetwear",
      size: "S",
      condition: "Very Good",
      brand: "Patagonia Custom",
      price: 85,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
      description: "Cozy recycled polyester fleece in limited edition colorblock neon violet and teal details. Extremely warm, features quick-snap collar.",
      seller: "Alpine Hype"
    },
    {
      id: 4,
      title: "Silk Crossover Evening Slip",
      category: "Designer",
      size: "S",
      condition: "New",
      brand: "La Perla Paris",
      price: 320,
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=600&auto=format&fit=crop",
      description: "Exquisite bias-cut 100% mulberry silk slip dress with hand-stitched lace crossover back. Retails for $650. Tag attached, never worn.",
      seller: "Luxury Vault"
    },
    {
      id: 5,
      title: "Distressed Graffiti Hoodie",
      category: "Streetwear",
      size: "XL",
      condition: "Good",
      brand: "Hype Couture",
      price: 115,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
      description: "Hand-painted custom cotton hoodie with screen printed spray graphics. Over-sized fit with raw-cut distressed hem and custom drawstrings.",
      seller: "Street Curator"
    },
    {
      id: 6,
      title: "Marrow Silk Ribbon Blouse",
      category: "Designer",
      size: "M",
      condition: "Excellent",
      brand: "Chloé Atelier",
      price: 260,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
      description: "Silk-crepe blouse in luxury off-white with delicate ribbon collar details. Minimalist fluid silhouette. No blemishes, professionally dry-cleaned.",
      seller: "Chloé Lover"
    },
    {
      id: 7,
      title: "Raw Recycled Wool Cargo Pants",
      category: "Sustainable",
      size: "L",
      condition: "Excellent",
      brand: "Issey Custom",
      price: 195,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
      description: "Handcrafted cargo trousers made from recycled wool blend. Detailed with asymmetrical utility pockets and a relaxed straight-leg taper.",
      seller: "Studio Loop"
    }
  ]);

  const [cart, setCart] = useState([]);
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [initialCategory, setInitialCategory] = useState('All');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cloth_demo_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cloth_demo_cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart helper
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  // Global Scroll Animation Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.08,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      const targets = document.querySelectorAll('.scroll-animate');
      targets.forEach((target) => observer.observe(target));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const targets = document.querySelectorAll('.scroll-animate');
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [currentRoute, products, cart]);

  const renderPage = () => {
    switch(currentRoute) {
      case 'home':
        return (
          <Home 
            products={products} 
            addToCart={addToCart} 
            setCurrentRoute={setCurrentRoute} 
            setInitialCategory={setInitialCategory} 
          />
        );
      case 'shop':
        return (
          <Shop 
            products={products} 
            addToCart={addToCart} 
            setCurrentRoute={setCurrentRoute} 
            initialCategory={initialCategory}
            setInitialCategory={setInitialCategory}
          />
        );
      case 'sell':
        return <Sell products={products} setProducts={setProducts} />;
      case 'cart':
        return <Cart cart={cart} setCart={setCart} setCurrentRoute={setCurrentRoute} />;
      case 'about':
        return <About />;
      default:
        return (
          <Home 
            products={products} 
            addToCart={addToCart} 
            setCurrentRoute={setCurrentRoute} 
            setInitialCategory={setInitialCategory} 
          />
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <ParallaxBackground />
      
      {/* Sidebar navigation */}
      <Sidebar 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute} 
        cartCount={getCartCount()} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main content pane */}
      <div 
        className="main-content-layout" 
        style={{ marginLeft: isCollapsed ? '85px' : '260px' }}
      >
        <main style={{ flexGrow: 1 }}>
          {renderPage()}
        </main>
        <Footer setCurrentRoute={setCurrentRoute} />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute} 
        cartCount={getCartCount()} 
      />
    </div>
  );
}

export default App;
