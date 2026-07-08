import React, { useState } from 'react';
import { 
  Home, 
  ShoppingBag, 
  DollarSign, 
  ShoppingCart, 
  Info, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ currentRoute, setCurrentRoute, cartCount, isCollapsed, setIsCollapsed }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop Catalog', icon: ShoppingBag },
    { id: 'sell', label: 'Sell Clothes', icon: DollarSign },
    { id: 'cart', label: 'Your Cart', icon: ShoppingCart, badge: true },
    { id: 'about', label: 'About & Contact', icon: Info }
  ];

  const handleNavClick = (routeId) => {
    setCurrentRoute(routeId);
    setIsMobileOpen(false); // Close mobile drawer on selection
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <header className={styles.mobileHeader}>
        <button 
          className={styles.hamburgerBtn} 
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open Navigation"
        >
          <Menu size={24} />
        </button>
        <span className={styles.brandName} style={{ fontSize: '1.25rem' }}>CLOTH.DEMO</span>
        <button 
          className={styles.mobileCartBtn} 
          onClick={() => setCurrentRoute('cart')}
          aria-label="Open Cart"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className={styles.mobileCartBadge}>{cartCount}</span>}
        </button>
      </header>

      {/* Mobile Dark Backdrop Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Navigation Container */}
      <div className={`
        ${styles.sidebarContainer} 
        ${isCollapsed ? styles.collapsed : ''} 
        ${isMobileOpen ? styles.sidebarContainerActive : ''}
      `}>
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
          {/* Logo Brand Title */}
          <div>
            <div className={styles.header}>
              <div className={styles.logo}>C</div>
              <span className={styles.brandName}>CLOTH.DEMO</span>
              {isMobileOpen && (
                <button 
                  className={styles.hamburgerBtn} 
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Nav list */}
            <nav className={styles.navLinks}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                  >
                    <span className={styles.icon}>
                      <IconComponent size={20} />
                    </span>
                    <span className={styles.btnText}>{item.label}</span>
                    {item.badge && cartCount > 0 && (
                      <span className={styles.cartBadge}>{cartCount}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User profile & Collapse Trigger */}
          <div className={styles.controls}>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <User size={16} />
              </div>
              <div className={styles.btnText} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Shopkeeper Mode</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Status: Active</span>
              </div>
            </div>

            <button 
              className={styles.toggleBtn} 
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <span className={styles.icon}>
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </span>
              <span className={styles.btnText}>Collapse Menu</span>
            </button>
            
            <div className={styles.footerText}>
              &copy; {new Date().getFullYear()} CLOTH.DEMO
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
