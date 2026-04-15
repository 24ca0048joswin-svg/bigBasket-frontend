import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SmartBasketCard.css';

export default function SmartBasketCard({
  productId,
  name,
  imageUrl,
  discountPercent,
  currentPrice,
  originalPrice,
  // quantity = '1 kg',
  tag = '',
  isHarDinSasta = false,
}) {
  // const [qty, setQty] = useState(1);

  return (
    <div className="smart-basket-card">
      {discountPercent > 0 && (
        <div className="discount-badge">{discountPercent}% OFF</div>
      )}

      {tag && <div className="product-tag">{tag}</div>}

      <div className="image-container">
        <img src={`${import.meta.env.VITE_BACKEND_URI}/static/${imageUrl}`} alt={name} className="product-image" />
      </div>

      <div className="delivery-time">
        <span className="fresho">fresho!</span>
        <span className="mins">● 10 MINS</span>
      </div>

      <div className="product-name">{name}</div>

      {/* <div className="quantity-selector">
        <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
          <option value="1">1 kg</option>
          <option value="2">2 kg</option>
          <option value="0.5">0.5 kg</option>
        </select>
      </div> */}

      <div className="price-row">
        <span className="current-price">₹{currentPrice}</span>
        {originalPrice && originalPrice > currentPrice && (
          <span className="original-price">₹{originalPrice}</span>
        )}
      </div>

      {isHarDinSasta && (
        <div className="har-din-sasta">
          <span>Har Din Sasta!</span>
        </div>
      )}

      <div className="add-section">
        <button className="bookmark-btn">♡</button>
        <Link to={`/view/${productId}`} className="add-btn link-margin">View</Link>
      </div>
    </div>
  );
}
