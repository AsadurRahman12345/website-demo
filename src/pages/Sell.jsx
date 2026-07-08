import React, { useState } from 'react';
import { Sparkles, CheckCircle, Trash2, ArrowRight, Upload } from 'lucide-react';
import styles from './Sell.module.css';

export default function Sell({ products, setProducts }) {
  // Form fields state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vintage');
  const [size, setSize] = useState('M');
  const [condition, setCondition] = useState('Excellent');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Form submission animation states
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Preset Unsplash images to make demo listing extremely easy
  const presets = [
    {
      label: "Classic Denim",
      url: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop"
    },
    {
      label: "Winter Woolen",
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
    },
    {
      label: "Hype Streetwear",
      url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop"
    },
    {
      label: "Designer Ribbed",
      url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop"
    }
  ];

  // Filter products listed by this current seller profile
  const sellerListings = products.filter(p => p.seller === "My Boutique");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    setIsPublishing(true);

    // Simulate curator audit & server latency
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);

      // Create new product item
      const newProduct = {
        id: Date.now(),
        title,
        category,
        size,
        condition,
        brand: brand || "Unlabeled",
        price: parseFloat(price) || 0,
        image: imageUrl || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
        description,
        seller: "My Boutique"
      };

      // Update products database state
      setProducts(prev => [newProduct, ...prev]);

      // Reset form fields after success animation finishes
      setTimeout(() => {
        setIsSuccess(false);
        setTitle('');
        setCategory('Vintage');
        setSize('M');
        setCondition('Excellent');
        setBrand('');
        setPrice('');
        setImageUrl('');
        setDescription('');
      }, 2000);

    }, 2000);
  };

  const handleDeleteListing = (id) => {
    if (window.confirm("Are you sure you want to take down this listed garment?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className={styles.sellContainer}>
      <div className={`${styles.titleSection} scroll-animate fade-down`}>
        <h1 className={styles.title}>Seller Dashboard</h1>
        <p className={styles.subtitle}>List your pre-loved collections or boutique designs instantly.</p>
      </div>

      <div className={styles.grid}>
        {/* Left Form Panel */}
        <div className={`${styles.formCard} glass-panel scroll-animate fade-left`}>
          {isPublishing ? (
            <div className={styles.loaderOverlay}>
              <div className={styles.spinner} />
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Analyzing Garment Details...</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Our curators are checking tags, stitch structure, and pricing models.</p>
            </div>
          ) : isSuccess ? (
            <div className={styles.loaderOverlay}>
              <CheckCircle size={48} className={styles.successIcon} />
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Listing Published!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>Your item is now live on the shop catalog hub.</p>
              <div className="badge">Curator Approved</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className={styles.sectionHeading}>List New Garment</h2>

              <div className={styles.formGroup}>
                <label className={styles.label}>Garment Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Vintage Oversized Leather Bomber Jacket" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select 
                    className={styles.select}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Vintage">Vintage</option>
                    <option value="Sustainable">Sustainable</option>
                    <option value="Streetwear">Streetwear</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Brand / Label</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Yves Saint Laurent" 
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Size</label>
                  <select 
                    className={styles.select}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Condition</label>
                  <select 
                    className={styles.select}
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="New">New with tags</option>
                    <option value="Excellent">Excellent condition</option>
                    <option value="Very Good">Very Good condition</option>
                    <option value="Good">Good condition</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Retail Price ($ USD)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="e.g. 120" 
                  min="5"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Garment Image URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="Paste direct image link, or pick a preset below..." 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                
                {/* Preset suggestions */}
                <div style={{ marginTop: '15px' }}>
                  <div className={styles.presetsTitle}>Demo Image Presets</div>
                  <div className={styles.presetsGrid}>
                    {presets.map((pr, idx) => (
                      <div 
                        key={idx}
                        className={`${styles.presetThumb} ${imageUrl === pr.url ? styles.activePresetThumb : ''}`}
                        style={{ backgroundImage: `url(${pr.url})` }}
                        onClick={() => setImageUrl(pr.url)}
                        title={pr.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description & Fitting details</label>
                <textarea 
                  className={styles.textarea}
                  placeholder="Describe material type, measurements, tags, and fits. Be honest about minor blemishes or structural conditions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Publish Listing <Sparkles size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Right Active Listings Panel */}
        <div className={`${styles.listingsPanel} glass-panel scroll-animate fade-right`}>
          <h2 className={styles.sectionHeading}>Your Active Storefront</h2>
          
          <div className={styles.listItems}>
            {sellerListings.length > 0 ? (
              sellerListings.map((item, index) => (
                <div key={item.id} className={`${styles.listItem} scroll-animate fade-up`} style={{ transitionDelay: `${index * 50}ms` }}>
                  <div 
                    className={styles.listThumb} 
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className={styles.listDetails}>
                    <h3 className={styles.listTitle}>{item.title}</h3>
                    <div className={styles.listMeta}>
                      <span>Size {item.size} &bull; {item.category} &bull; {item.condition}</span>
                    </div>
                  </div>
                  <div className={styles.listPrice}>
                    ${item.price}
                  </div>
                  <button 
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteListing(item.id)}
                    title="Take down listing"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.emptyListings}>
                <Upload size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <p>No active garments listed by you.</p>
                <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Fill out the form to launch your digital storefront.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
