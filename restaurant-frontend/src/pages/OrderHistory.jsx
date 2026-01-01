import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/orderHistory.css";

function OrderHistory() {
  const [orderSummary, setOrderSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const tableNumber = localStorage.getItem("tableNumber");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await API.get(`/orders/items/${tableNumber}`);
        setOrderSummary(response.data);
      } catch (err) {
        console.error("Failed to fetch order summary", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [tableNumber]);

  if (loading) return <div className="loading">Loading order history...</div>;

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">
        Order Summary - Table {tableNumber}
      </h2>

      {!orderSummary || Object.keys(orderSummary.items || {}).length === 0 ? (
        <div>No items ordered yet.</div>
      ) : (
        <>
          <ul className="order-items">
            {Object.entries(orderSummary.items).map(
              ([itemName, quantity], i) => (
                <li key={i}>
                  {itemName} × {quantity}
                </li>
              )
            )}
          </ul>
          <div className="order-price">
            Total: ₹{orderSummary.totalPrice.toFixed(2)}
          </div>
        </>
      )}

      <button
        className="back-button"
        onClick={() => (window.location.href = "/menu")}
      >
        ← Back to Menu
      </button>
    </div>
  );
}

export default OrderHistory;
