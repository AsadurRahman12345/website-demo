import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import styles from './Cart.module.css';

export default function Cart({ cart, setCart, setCurrentRoute }) {
  // Billing Form State
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Checkout states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Cost Computations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal === 0 ? 0 : (subtotal > 200 ? 0 : 15);
  const tax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + shipping + tax;

  const handleQtyChange = (productId, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0 || !fullName || !address || !city || !zip) return;

    setIsCheckingOut(true);

    // Simulate merchant payment gateway authorization
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsOrderPlaced(true);

      const generatedReceipt = {
        orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        buyerName: fullName,
        shippingAddress: `${address}, ${city}, ${zip}`,
        paymentType: paymentMethod === 'card' ? 'Credit Card' : (paymentMethod === 'paypal' ? 'PayPal Checkout' : 'Cryptocurrency'),
        grandTotal: total.toFixed(2),
        purchasedItems: [...cart]
      };

      setReceipt(generatedReceipt);

      // Clear checkout state variables and globally flush cart
      setCart([]);
      setFullName('');
      setAddress('');
      setCity('');
      setZip('');
      setPaymentMethod('card');
    }, 2500);
  };

  const handleFinish = () => {
    setIsOrderPlaced(false);
    setReceipt(null);
    setCurrentRoute('shop');
  };

  // Condition 1: Showing checkout receipt upon completion
  if (isOrderPlaced && receipt) {
    return (
      <div className={styles.cartContainer}>
        <div className={`${styles.receiptCard} glass-panel fade-in`}>
          <CheckCircleIcon />
          <h1 className={styles.receiptHeading}>Payment Authorized</h1>
          <p className={styles.receiptDesc}>Thank you for supporting circular fashion. Your order details are below.</p>
          
          <div className={styles.receiptDetails}>
            <div className={styles.receiptRow}>
              <span>Order Reference:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{receipt.orderId}</strong>
            </div>
            <div className={styles.receiptRow}>
              <span>Estimated Delivery:</span>
              <span style={{ color: 'var(--accent-cyan)' }}>3-5 Business Days</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Recipient:</span>
              <span style={{ color: 'var(--text-primary)' }}>{receipt.buyerName}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Destination:</span>
              <span style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{receipt.shippingAddress}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Settled via:</span>
              <span style={{ color: 'var(--text-primary)' }}>{receipt.paymentType}</span>
            </div>

            <div className={styles.receiptTotalRow}>
              <span>Total Debited:</span>
              <span style={{ color: 'var(--accent-gold)' }}>${receipt.grandTotal}</span>
            </div>
          </div>

          <button onClick={handleFinish} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Browse More Clothes <Sparkles size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={`${styles.titleSection} scroll-animate fade-down`}>
        <h1 className={styles.title}>Your Shopping Cart</h1>
        <p className={styles.subtitle}>Review your selected sustainable or vintage items before checking out.</p>
      </div>

      {isCheckingOut ? (
        <div className={`${styles.loaderOverlay} glass-panel`}>
          <div className={styles.spinner} />
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Processing Safe Payment...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Escrow payment tokens are being encrypted. Do not reload or navigate away.</p>
        </div>
      ) : (
        <div className={styles.layout}>
          {/* Left Cart items list */}
          <div className={`${styles.cartItemsCard} glass-panel scroll-animate fade-left`}>
            <h2 className={styles.sectionHeading}>Garments Selected</h2>

            {cart.length > 0 ? (
              <div className={styles.cartList}>
                {cart.map((item, index) => (
                  <div key={item.id} className={`${styles.cartItem} scroll-animate fade-up`} style={{ transitionDelay: `${index * 50}ms` }}>
                    <div 
                      className={styles.itemImage} 
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.title}</h3>
                      <div className={styles.itemMeta}>
                        <span>Brand: {item.brand} &bull; Size: {item.size} &bull; Category: {item.category}</span>
                      </div>
                    </div>

                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.qtyBtn} 
                        onClick={() => handleQtyChange(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn} 
                        onClick={() => handleQtyChange(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className={styles.priceCol}>
                      <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    <button 
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyCart}>
                <ShoppingCart size={40} style={{ opacity: 0.3, marginBottom: '15px', color: 'var(--text-primary)' }} />
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Your shopping cart is currently empty.</p>
                <button className="btn-secondary" onClick={() => setCurrentRoute('shop')}>
                  Go To Catalog
                </button>
              </div>
            )}
          </div>

          {/* Right Checkout Panel */}
          {cart.length > 0 && (
            <div className={`${styles.checkoutPanel} glass-panel scroll-animate fade-right`}>
              <h2 className={styles.sectionHeading}>Order Summary</h2>

              <div className={styles.costSummary}>
                <div className={styles.summaryRow}>
                  <span>Items Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping Fee:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Estimated Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Grand Total:</span>
                  <span style={{ color: 'var(--accent-gold)' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '15px' }}>Shipping Credentials</h3>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Eleanor Vance" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Shipping Address</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 452 Broadway Street" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="New York" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required 
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Zip Code</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="10013" 
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', margin: '20px 0 12px' }}>Payment Mode</h3>
                
                <div className={styles.paymentGrid}>
                  <button 
                    type="button"
                    className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.paymentOptionActive : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Credit Card
                  </button>
                  <button 
                    type="button"
                    className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? styles.paymentOptionActive : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    PayPal
                  </button>
                  <button 
                    type="button"
                    className={`${styles.paymentOption} ${paymentMethod === 'crypto' ? styles.paymentOptionActive : ''}`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    Crypto
                  </button>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Secure Checkout <ShieldCheck size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple success icon SVG component
function CheckCircleIcon() {
  return (
    <svg className={styles.successIcon} width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
