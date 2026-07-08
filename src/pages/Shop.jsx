import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, Eye, X, Info } from 'lucide-react';
import styles from './Shop.module.css';

export default function Shop({ products, addToCart, setCurrentRoute, initialCategory, setInitialCategory }) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(400);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (initialCategory && initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Product Details Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Added To Cart animation states for buttons (stores productId to show temporary "Added!")
  const [addedButtons, setAddedButtons] = useState({});

  const categories = ['All', 'Vintage', 'Sustainable', 'Streetwear', 'Designer'];
  const sizes = ['All', 'S', 'M', 'L', 'XL'];
  const conditions = ['All', 'New', 'Excellent', 'Very Good', 'Good'];

  // Handle temporary cart feedback
  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Avoid triggering details modal
    addToCart(product);
    
    // Set active state for button
    setAddedButtons(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedButtons(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSize = selectedSize === 'All' || p.size === selectedSize;
        const matchesCondition = selectedCondition === 'All' || p.condition === selectedCondition;
        const matchesPrice = p.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesSize && matchesCondition && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        // Default newest (assumed by reverse ID order in seeded mock database)
        return b.id - a.id;
      });
  }, [products, searchQuery, selectedCategory, selectedSize, selectedCondition, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedCondition('All');
    setMaxPrice(400);
    setSortBy('newest');
  };

  return (
    <div className={styles.shopContainer}>
      {/* Title header */}
      <div className={`${styles.titleSection} scroll-animate fade-down`}>
        <h1 className={styles.title}>The Curation Hub</h1>
        <p className={styles.subtitle}>Handpicked items, listed directly by curators and sustainable shopkeepers.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={`${styles.filterPanel} glass-panel scroll-animate fade-left`}>
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>
              <span>Category</span>
              {(selectedCategory !== 'All' || selectedSize !== 'All' || selectedCondition !== 'All' || searchQuery !== '' || maxPrice < 400) && (
                <button className={styles.clearFiltersBtn} onClick={clearFilters}>Reset</button>
              )}
            </div>
            {categories.map((cat) => (
              <label key={cat} className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="category"
                  className={styles.checkbox}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Size</div>
            <div className={styles.sizeGrid}>
              {sizes.map((sz) => (
                <button
                  key={sz}
                  className={`${styles.sizeChip} ${selectedSize === sz ? styles.sizeChipActive : ''}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Price Threshold</div>
            <input
              type="range"
              min="20"
              max="400"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
            <div className={styles.priceRangeText}>
              <span>Min: $20</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Max: ${maxPrice}</span>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Garment Condition</div>
            {conditions.map((cond) => (
              <label key={cond} className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="condition"
                  className={styles.checkbox}
                  checked={selectedCondition === cond}
                  onChange={() => setSelectedCondition(cond)}
                />
                {cond}
              </label>
            ))}
          </div>
        </aside>

        {/* Catalog grid area */}
        <main className={styles.mainArea}>
          {/* Search and Sort Toolbar */}
          <div className={`${styles.searchHeader} scroll-animate fade-down`}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search vintage denim, designer silks, tags..."
                className={`${styles.searchInput} form-input`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="newest">Sort: Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results count text */}
          <div className={styles.resultsCount}>
            Showing {filteredProducts.length} of {products.length} garments listed
          </div>

          {/* Grid display */}
          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product, index) => {
                const anim = index % 3 === 0 
                  ? "scroll-animate fade-left" 
                  : index % 3 === 1 
                    ? "scroll-animate fade-up delay-100" 
                    : "scroll-animate fade-right delay-200";
                return (
                  <div 
                    key={product.id} 
                    className={`${styles.card} glass-panel ${anim}`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className={styles.imgContainer}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className={styles.productImage} 
                      loading="lazy"
                    />
                    <span className={`${styles.cardBadge} badge`}>{product.category}</span>
                    <span className={styles.cardPriceBadge}>${product.price}</span>
                  </div>

                  <div className={styles.cardDetails}>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardCategory}>{product.brand}</span>
                      <h3 className={styles.cardTitle}>{product.title}</h3>
                    </div>

                    <div className={styles.cardMetaRow}>
                      <div className={styles.sellerProfile}>
                        <div className={styles.sellerInitials}>
                          {product.seller ? product.seller.substring(0,2).toUpperCase() : 'QC'}
                        </div>
                        <span>{product.seller || 'Verified Shop'}</span>
                      </div>
                      <span>Size: <strong>{product.size}</strong></span>
                    </div>

                    <button 
                      className={styles.addToCartBtn}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      {addedButtons[product.id] ? "Added to Cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
          ) : (
            <div className={`${styles.emptyState} glass-panel`}>
              <SlidersHorizontal size={40} className="text-gradient" />
              <h3 className={styles.emptyStateTitle}>No garments match your filters</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Try clearing selected conditions or broadening search keywords.</p>
              <button className="btn-secondary" onClick={clearFilters}>Reset All Filters</button>
            </div>
          )}
        </main>
      </div>

      {/* Product Details Modal popup */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={`${styles.modalContent} fade-in`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setSelectedProduct(null)}>
              <X size={20} />
            </button>

            {/* Left Image */}
            <div 
              className={styles.modalImageCol} 
              style={{ backgroundImage: `url(${selectedProduct.image})` }}
            />

            {/* Right Information */}
            <div className={styles.modalInfoCol}>
              <span className={styles.modalCategory}>{selectedProduct.category}</span>
              <h2 className={styles.modalTitle}>{selectedProduct.title}</h2>
              
              <div className={styles.modalPrice}>
                <span>${selectedProduct.price}</span>
                <span className={`${styles.modalPriceBadge} badge`}>{selectedProduct.condition} condition</span>
              </div>

              <p className={styles.modalDesc}>{selectedProduct.description}</p>

              {/* Specific metadata table */}
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Size</span>
                  <span className={styles.detailVal}>{selectedProduct.size}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Brand/Label</span>
                  <span className={styles.detailVal}>{selectedProduct.brand}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Listed By</span>
                  <span className={styles.detailVal}>{selectedProduct.seller || 'Verified Shop'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Verification</span>
                  <span className={styles.detailVal} style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Curator Checked <ShieldCheck size={14} />
                  </span>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={(e) => {
                    handleAddToCart(selectedProduct, e);
                    setSelectedProduct(null);
                  }}
                >
                  <ShoppingCart size={18} /> 
                  {addedButtons[selectedProduct.id] ? "Added!" : "Add to Cart"}
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setSelectedProduct(null)}
                >
                  Back to Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
