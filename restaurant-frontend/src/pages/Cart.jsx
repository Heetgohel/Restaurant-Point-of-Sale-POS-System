import React, { useState, useEffect } from 'react';
import API from '../api';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css';

function Cart() {
  const [order, setOrder] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const tableNumber = localStorage.getItem("tableNumber");
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order")) || {};
    console.log("Retrieved Order in Cart:", savedOrder); // Debugging order data
    setOrder(savedOrder);

    API.get('/menu')
      .then(res => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load menu");
        setLoading(false);
      });
  }, []);

  const getItemDetails = (name) => menuItems.find(item => item.name === name);
 

  const handleQuantityChange = (name, delta) => {
    setOrder(prev => {
      const updated = { ...prev, [name]: (prev[name] || 0) + delta };
      if (updated[name] <= 0) delete updated[name];
      localStorage.setItem("order", JSON.stringify(updated));
      return updated;
    });
  };

  const totalPrice = Object.entries(order).reduce((total, [name, qty]) => {
    const item = getItemDetails(name);
    console.log("Item Details:", item);
    return total + (item?.price || 0) * qty;
  }, 0);

  const handlePlaceOrder = async () => {
    try {
      const itemsArray = [];
      let totalPrice = 0;  // Initialize total price to 0
  
      Object.entries(order).forEach(([name, quantity]) => {
        for (let i = 0; i < quantity; i++) {
          const item = getItemDetails(name);  // Get the details of the item (e.g., price)
          itemsArray.push({ 
            name: item.name, 
            itemPrice: item?.price,   // Price of the item
            status: "pending",  // Default status
            category: item?.category,
            
          });
          totalPrice += item?.price;  // Add the price to the total
        }
      });
  
      const orderData = {
        tableNumber,
        order: itemsArray,
        totalPrice,  // Ensure total price is calculated correctly
      };
  
      await API.post("/orders/place", orderData);
  
      // Clear cart after successful order
      localStorage.removeItem("order");
      setOrder({});
      setSuccessMessage("Your order has been placed successfully!");
    } catch (err) {
      alert("Failed to place order");
    }
  };
  

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {Object.entries(order).length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div>
          {Object.entries(order).map(([name, qty]) => {
            const item = getItemDetails(name);
            return (
              <div key={name} className="cart-item">
                <div>
                  <strong>{name}</strong>
                  <div className="item-details">₹{item?.price.toFixed(2)} × {qty}</div>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(name, -1)} className="quantity-button">−</button>
                  <span>{qty}</span>
                  <button onClick={() => handleQuantityChange(name, 1)} className="quantity-button">+</button>
                </div>
              </div>
            );
          })}
          <div className="total-price">
            Total: ₹{totalPrice.toFixed(2)}
          </div>
          <Button onClick={handlePlaceOrder} className="place-order-button">
            Confirm & Place Order
          </Button>
        </div>
      )}

      <Button onClick={() => navigate('/menu')} className="back-to-menu-button">
        Back to Menu
      </Button>
    </div>
  );
}

export default Cart;
