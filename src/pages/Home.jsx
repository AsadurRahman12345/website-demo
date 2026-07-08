import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  ArrowUp,
  Tag,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import styles from './Home.module.css';

export default function Home({ products, addToCart, setCurrentRoute, setInitialCategory }) {
  // Added To Cart animation states for trending drops
  const [addedButtons, setAddedButtons] = useState({});
  const trendingDrops = products ? products.slice(0, 3) : [];
  // Hero Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
      subtitle: "Reimagined Sustainable Fashion",
      title: "Curated Vintage, Loved Again",
      desc: "Explore high-quality garments from global curators or list your own pre-loved styles. Join the movement to make fashion circular, sustainable, and stunning.",
      btnText: "Explore Shop",
      action: () => setCurrentRoute('shop')
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
      subtitle: "List in Minutes",
      title: "Unload Your Closet, Earn Cash",
      desc: "Turn your pre-loved designer garments, retro finds, or streetwear into cash. List products for free, ship securely with tracking, and join a verified curator network.",
      btnText: "Start Selling",
      action: () => setCurrentRoute('sell')
    },
    {
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop",
      subtitle: "Premium Peer-to-Peer",
      title: "Designed For Independent Brands",
      desc: "Are you a shopkeeper or custom designer? Set up your digital storefront instantly and showcase your fashion lines directly to thousands of ready buyers.",
      btnText: "Discover Catalog",
      action: () => setCurrentRoute('shop')
    }
  ];

  // Auto scroll slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);



  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  // Stats Counter State & Animation (Simplified Mount Animation)
  const [stats, setStats] = useState({ items: 0, users: 0, co2: 0, activeBrands: 0 });
  
  useEffect(() => {
    const targets = { items: 54, users: 18, co2: 92, activeBrands: 310 };
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      setStats({
        items: Math.floor((targets.items / totalFrames) * frame),
        users: Math.floor((targets.users / totalFrames) * frame),
        co2: Math.floor((targets.co2 / totalFrames) * frame),
        activeBrands: Math.floor((targets.activeBrands / totalFrames) * frame)
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setStats({
          items: targets.items,
          users: targets.users,
          co2: targets.co2,
          activeBrands: targets.activeBrands
        });
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "CLOTH.DEMO transformed my closet cleanout. I listed 12 vintage jackets and sold them in a single week. The interface feels premium and payout was immediate!",
      name: "Marcus Sterling",
      role: "Vintage Curator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "As an independent boutique shopkeeper, finding a platform that supports design aesthetics was key. The buyer traffic is highly targeted, and listing products is friction-free.",
      name: "Seraphina Lin",
      role: "Boutique Owner, L'AURA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "The quality check verification gives me massive confidence. Every high-end streetwear garment I bought was exactly as described, neatly packaged, and verified authentic.",
      name: "Helena Vance",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
    }
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    {
      question: "How does the buying and selling process work?",
      answer: "Sellers list items in under two minutes via the 'Sell Clothes' portal. Buyers browse, filters, and checkout securely. We generate shipping credentials automatically. Once the buyer verifies delivery, funds are disbursed safely to the seller."
    },
    {
      question: "How do you guarantee quality and authenticity?",
      answer: "Every listing undergoes visual verification by our fashion curators. For designer label garments, we evaluate tag layouts, stitching, and documentation. Items failing our standards are rejected to protect buyers."
    },
    {
      question: "What are the transaction fees?",
      answer: "Listing clothes is 100% free! We only apply a simple 5% transaction commission on successful sales. This directly funds our payment security systems, curator team, and automated tracking integrations."
    },
    {
      question: "How is shipping handled?",
      answer: "Once your item sells, an automated shipping label is generated. Simply print the label, pack the garment with care, and scan it at the designated carrier branch. Both parties can track shipment status live in the app."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Back to Top Button
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section Carousel */}
      <section className={styles.heroSection}>
        <div className={styles.heroSlider}>
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`${styles.slide} ${activeSlide === idx ? styles.activeSlide : ''}`}
            >
              <div 
                className={styles.slideBgImage} 
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <span>✦ Curated Choice</span>
                </div>
                <span className={styles.heroSubtitle}>{slide.subtitle}</span>
                <h1 className={styles.heroTitle}>{slide.title}</h1>
                <p className={styles.heroDesc}>{slide.desc}</p>
                <div className={styles.heroActions}>
                  <button onClick={slide.action} className="btn-primary">
                    {slide.btnText} <ArrowRight size={16} />
                  </button>
                  <button onClick={() => setCurrentRoute('about')} className="btn-secondary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Manual Slides Controls */}
        <button className={`${styles.arrowBtn} ${styles.prevBtn}`} onClick={handlePrevSlide} aria-label="Previous Slide">
          <ChevronLeft size={22} />
        </button>
        <button className={`${styles.arrowBtn} ${styles.nextBtn}`} onClick={handleNextSlide} aria-label="Next Slide">
          <ChevronRight size={22} />
        </button>

        {/* Dot indicators */}
        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dot} ${activeSlide === idx ? styles.activeDot : ''}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Curated Collections Section */}
      <section className={styles.section} style={{ paddingBottom: '40px' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Curated Closets</span>
          <h2 className={styles.sectionTitle}>Shop By Aesthetics</h2>
          <p className={styles.sectionDesc}>Filter by specific curated clothing cultures. Click any card to launch the catalog with active filter metrics.</p>
        </div>

        <div className={styles.collectionsGrid}>
          {[
            { num: "01", name: "Vintage Couture", tag: "Vintage", desc: "Rare vintage jackets & retro statements", anim: "scroll-animate fade-left" },
            { num: "02", name: "Modern Streetwear", tag: "Streetwear", desc: "Oversized hoodies & relaxed cargos", anim: "scroll-animate fade-down delay-100" },
            { num: "03", name: "Designer Atelier", tag: "Designer", desc: "High-end luxury labels & tailored silk", anim: "scroll-animate fade-up delay-200" },
            { num: "04", name: "Sustainable Basics", tag: "Sustainable", desc: "Organic linen & eco-conscious knits", anim: "scroll-animate fade-right delay-300" }
          ].map((col) => (
            <div 
              key={col.num} 
              className={`${styles.collectionCard} glass-panel ${col.anim}`}
              onClick={() => {
                setInitialCategory(col.tag);
                setCurrentRoute('shop');
              }}
            >
              <div className={styles.collectionInfo}>
                <span className={styles.collectionNum}>{col.num}</span>
                <h3 className={styles.collectionCardTitle}>{col.name}</h3>
                <span className={styles.collectionLabel}>{col.desc}</span>
              </div>
              <ArrowRight className={styles.collectionChevron} size={20} />
            </div>
          ))}
        </div>
      </section>

      {/* Storytelling Timeline Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Curation Process</span>
          <h2 className={styles.sectionTitle}>How We Trade Fashion</h2>
          <p className={styles.sectionDesc}>Making clothing circular doesn't have to be complicated. Our three-step framework prioritizes beauty, safety, and circularity.</p>
        </div>

        <div className={styles.timeline}>
          {/* Step 1 */}
          <div className={`${styles.timelineItem} scroll-animate fade-left`}>
            <div className={styles.timelineNode} />
            <div className={`${styles.timelineCard} glass-panel`}>
              <span className={styles.stepNumber}>Step 01</span>
              <h3>Snap, Detail & Upload</h3>
              <p>Capture three photos of your designer or vintage item in natural light. Define the dimensions, condition, and value. List it on our platform for free in minutes.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`${styles.timelineItem} scroll-animate fade-right`}>
            <div className={styles.timelineNode} />
            <div className={`${styles.timelineCard} glass-panel`}>
              <span className={styles.stepNumber}>Step 02</span>
              <h3>Curator Quality Check</h3>
              <p>Our team cross-checks each submitted catalog entry. We verify structural conditions, tag validity, and correct pricing metrics to sustain our premium marketplace standards.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`${styles.timelineItem} scroll-animate fade-left`}>
            <div className={styles.timelineNode} />
            <div className={`${styles.timelineCard} glass-panel`}>
              <span className={styles.stepNumber}>Step 03</span>
              <h3>Insured Secure Ship</h3>
              <p>When an item sells, wrap it in your premium seller kit. Attach the pre-paid tracking label, drop it off, and monitor delivery. Payments release to you immediately upon buyer verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Curators/Stores Showcase */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Top Storefronts</span>
          <h2 className={styles.sectionTitle}>Featured Creator Stores</h2>
          <p className={styles.sectionDesc}>Discover independent design labels, boutique thrift curators, and local brands listing on our verified network.</p>
        </div>

        <div className={styles.storesGrid}>
          {[
            {
              name: "Retro Thread Co.",
              rating: "4.9",
              reviews: "112",
              location: "Soho, NY",
              followers: "12.4k",
              thumbs: [
                "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=300&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=300&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=300&auto=format&fit=crop"
              ]
            },
            {
              name: "Loom & Earth Studio",
              rating: "5.0",
              reviews: "84",
              location: "Paris, France",
              followers: "8.2k",
              thumbs: [
                "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=300&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300&auto=format&fit=crop"
              ]
            },
            {
              name: "Aura Archive Tokyo",
              rating: "5.0",
              reviews: "153",
              location: "Harajuku, JP",
              followers: "15.6k",
              thumbs: [
                "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=300&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=300&auto=format&fit=crop"
              ]
            }
          ].map((store, index) => {
            const anim = index === 0 
              ? "scroll-animate fade-left" 
              : index === 1 
                ? "scroll-animate zoom-in delay-100" 
                : "scroll-animate fade-right delay-200";
            return (
              <div key={index} className={`${styles.storeCard} glass-panel ${anim}`}>
                <div className={styles.storeHeader}>
                  <h3 className={styles.storeName}>
                    {store.name}
                    <span className={styles.verifiedBadge} title="Verified Curator">✓</span>
                  </h3>
                  <span className={styles.storeRating}>
                    ★ {store.rating} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({store.reviews})</span>
                  </span>
                </div>
                <span className={styles.storeLocation}>{store.location} &bull; {store.followers} followers</span>
                
                <div className={styles.thumbnailGrid}>
                  {store.thumbs.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={styles.storeThumb} 
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animated Statistics Counter */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Live Exchange Stats</span>
          <h2 className={styles.sectionTitle}>Making a Circular Impact</h2>
          <p className={styles.sectionDesc}>Every garment traded is a step towards reducing fashion carbon outputs and protecting our ecosystems.</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} glass-panel scroll-animate fade-up`}>
            <div className={`${styles.statNumber} text-gradient`}>{stats.items}k+</div>
            <div className={styles.statLabel}>Garments Circulated</div>
          </div>
          <div className={`${styles.statCard} glass-panel scroll-animate fade-up delay-100`}>
            <div className={`${styles.statNumber} text-gold-gradient`}>{stats.users}k+</div>
            <div className={styles.statLabel}>Curators Onboarded</div>
          </div>
          <div className={`${styles.statCard} glass-panel scroll-animate fade-up delay-200`}>
            <div className={`${styles.statNumber} text-gradient`}>{stats.co2}0+ Tons</div>
            <div className={styles.statLabel}>CO2 Emissions Saved</div>
          </div>
          <div className={`${styles.statCard} glass-panel scroll-animate fade-up delay-300`}>
            <div className={`${styles.statNumber} text-gold-gradient`}>{stats.activeBrands}</div>
            <div className={styles.statLabel}>Boutique Brands Listed</div>
          </div>
        </div>
      </section>

      {/* Weekly Trending Drops */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Weekly Drops</span>
          <h2 className={styles.sectionTitle}>Trending Circular Finds</h2>
          <p className={styles.sectionDesc}>Curated top-performing garment listings updated in real-time. Buy instantly or explore their storefront catalogs.</p>
        </div>

        <div className={styles.dropsGrid}>
          {trendingDrops.map((item, index) => {
            const anim = index === 0 
              ? "scroll-animate fade-left" 
              : index === 1 
                ? "scroll-animate fade-up delay-100" 
                : "scroll-animate fade-right delay-200";
            return (
              <div key={item.id} className={`${styles.dropCard} glass-panel ${anim}`}>
                <div className={styles.imgContainer}>
                  <img src={item.image} alt={item.title} className={styles.productImage} />
                  <span className={styles.cardPriceBadge}>${item.price}</span>
                </div>
                <div className={styles.cardDetails}>
                  <span className={styles.cardCategory}>{item.category}</span>
                  <h3 className={styles.cardTitle} onClick={() => {
                    setInitialCategory(item.category);
                    setCurrentRoute('shop');
                  }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '15px' }}>
                    {item.description.substring(0, 80)}...
                  </p>
                  <div className={styles.cardMetaRow}>
                    <span>Store: {item.seller}</span>
                    <button 
                      onClick={() => {
                        addToCart(item);
                        setAddedButtons(prev => ({ ...prev, [item.id]: true }));
                        setTimeout(() => {
                          setAddedButtons(prev => ({ ...prev, [item.id]: false }));
                        }, 1500);
                      }} 
                      className="btn-primary" 
                      style={{ padding: '6px 14px', fontSize: '0.85rem', borderRadius: '6px' }}
                    >
                      {addedButtons[item.id] ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Trusted Feedback</span>
          <h2 className={styles.sectionTitle}>Word from Our Curators</h2>
          <p className={styles.sectionDesc}>See how shopkeepers and fashion enthusiasts are scaling their wardrobes through CLOTH.DEMO.</p>
        </div>

        <div className={styles.testimonialSlider}>
          <div className={`${styles.testimonialCard} glass-panel scroll-animate zoom-in`}>
            <span className={styles.quoteIcon}>“</span>
            <p className={styles.quoteText}>{testimonials[activeTestimonial].quote}</p>
            <div className={styles.customer}>
              <div 
                className={styles.avatar} 
                style={{ backgroundImage: `url(${testimonials[activeTestimonial].avatar})` }}
              />
              <div className={styles.custInfo}>
                <div className={styles.custName}>{testimonials[activeTestimonial].name}</div>
                <div className={styles.custRole}>{testimonials[activeTestimonial].role}</div>
              </div>
            </div>
          </div>

          {/* Testimonial Navs */}
          <div className={styles.sliderNav}>
            <button className={styles.arrowBtn} style={{ position: 'static' }} onClick={handlePrevTestimonial} aria-label="Previous Testimonial">
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {activeTestimonial + 1} / {testimonials.length}
            </span>
            <button className={styles.arrowBtn} style={{ position: 'static' }} onClick={handleNextTestimonial} aria-label="Next Testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Accordion FAQ section */}
      <section className={styles.section} style={{ marginBottom: '40px' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPre}>Got Questions?</span>
          <h2 className={styles.sectionTitle}>Frequently Answered FAQs</h2>
          <p className={styles.sectionDesc}>Everything you need to know about buying, listing, payouts, and shipping on the marketplace.</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => {
            const isActive = openFaq === idx;
            const delayClass = `delay-${(idx + 1) * 100}`;
            return (
              <div key={idx} className={`${styles.faqItem} scroll-animate fade-up ${delayClass}`}>
                <button 
                  className={styles.faqHeader} 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isActive}
                >
                  <span>{faq.question}</span>
                  <span className={`${styles.faqIcon} ${isActive ? styles.faqIconRotated : ''}`}>
                    {isActive ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <div className={`${styles.faqAnswer} ${isActive ? styles.faqAnswerActive : ''}`}>
                  <div className={styles.faqContent}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Back to Top button */}
      <button 
        className={`${styles.backToTop} ${showBackToTop ? styles.backToTopVisible : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to Top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
