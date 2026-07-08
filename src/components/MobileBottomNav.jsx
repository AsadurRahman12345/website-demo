import React from 'react';
import { Home, ShoppingBag, PlusCircle, ShoppingCart } from 'lucide-react';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav({ currentRoute, setCurrentRoute, cartCount }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'sell', label: 'Sell', icon: PlusCircle },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, hasBadge: true }
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentRoute === item.id;

        return (
          <button
            key={item.id}
            className={`${styles.navItem} ${isActive ? styles.activeItem : ''}`}
            onClick={() => setCurrentRoute(item.id)}
          >
            <div className={styles.iconWrapper}>
              <IconComponent size={22} className={styles.icon} />
              {item.hasBadge && cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
