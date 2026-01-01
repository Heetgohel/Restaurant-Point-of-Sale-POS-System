import React, { useEffect, useState } from 'react';
import API from '../api';
import '../styles/bill.css';

function Bill() {
  const [orderEntries, setOrderEntries] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const tableNumber = localStorage.getItem("tableNumber");

  useEffect(() => {
    async function fetchBill() {
      try {
        const response = await API.get(`/orders/details/${tableNumber}`);
        const { orders, totalPrice } = response.data;
        setOrderEntries(orders);
        setTotalPrice(parseFloat(totalPrice).toFixed(2));
      } catch (err) {
        console.error("Failed to fetch bill data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBill();
  }, [tableNumber]);

  if (loading) return <div className="loading">Loading bill...</div>;

  return (
    <div className="bill-container">
      <h2 className="bill-title">Order History for Table {tableNumber}</h2>

      {orderEntries.map((entry, idx) => (
        <div key={idx} className="order-entry">
          <h4>Order {idx + 1} — {new Date(entry.timestamp).toLocaleTimeString()}</h4>
          {entry.items.map((item, i) => (
            <div key={i} className="bill-item">
              <span className="item-name">{item.name}</span>
              <span className={`item-status status-${item.status}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      ))}

      <div className="bill-total">
        Total: ₹{totalPrice}
      </div>

      <button className="back-button" onClick={() => window.location.href = '/menu'}>
        ← Back to Menu
      </button>
    </div>
  );
}

export default Bill;
